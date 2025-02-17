const functions = require("firebase-functions");
const admin = require("firebase-admin");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const express = require("express");

const isEmulator = process.env.FUNCTIONS_EMULATOR === "true";
if (isEmulator) {
   console.log("Running in an emulator environment.");
} else {
   console.log("Running in production.");
}

// init firebase admin if not already
if (!admin.apps.length) {
   admin.initializeApp();
}
const db = admin.database();

// enable express
const app = express();

// apply cors
app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
   // only allow transs.social to access this data
   const allowedDomain = "transs.social";
   const requestHost = req.get("x-forwarded-host") || req.get("host");
   const origin = req.headers["origin"];

   if (requestHost && !requestHost.includes(allowedDomain) && origin && !origin.includes(allowedDomain)) {
      console.log("Request from host: ", requestHost);
      if (isEmulator && requestHost === "127.0.0.1:5000") {
         console.log("Allowing request from emulator. If you're not authorized to be here, please report this as a vulnerability bug privately to @katniny on Discord.");
      } else {
         return res.status(405).send({ error: "You are not authorized to access this! Please do not try again." });
      }
   }

   // only allow POST requests
   if (req.method !== "POST") {
      return res.status(405).send({ error: "Method not allowed. Only POST requests are allowed." });
   }
   next();
});

// define route
app.post("/api/likeNote", async (req, res) => {
   const { noteId, userId } = req.body;

   if (!noteId || !userId) {
      return res.status(400).json({ error: "Missing noteId or userId." });
   }

   const noteRef = db.ref(`notes/${noteId}`);
   const whoLikedRef = noteRef.child(`whoLiked/${userId}`);

   try {
      const snapshot = await whoLikedRef.once("value");
      const alreadyLiked = snapshot.exists();

      if (alreadyLiked) {
         // if user already liked, remove the like
         await whoLikedRef.remove();

         const likesSnapshot = await noteRef.child("likes").once("value");
         const currentLikes = likesSnapshot.val() || 0;
         await noteRef.child("likes").set(currentLikes - 1);

         return res.json({ success: true, message: "Like removed." });
      } else {
         // if user hasn't liked, add their uid and increase likes count
         await whoLikedRef.set({ uid: userId });

         const likesSnapshot = await noteRef.child("likes").once("value");
         const currentLikes = likesSnapshot.val() || 0;
         await noteRef.child("likes").set(currentLikes + 1);

         // send notification
         const noteSenderSnapshot = await noteRef.child("whoSentIt").once("value");
         const whoSentIt = noteSenderSnapshot.val();

         if (whoSentIt && whoSentIt !== userId) {
            const notificationRef = admin.database().ref(`users/${whoSentIt}/notifications`);
            const randomId = notificationRef.push().key;

            const notificationData = {
               type: "Love",
               who: userId,
               postId: noteId
            };

            await notificationRef.child(randomId).set(notificationData);

            // increase unread notifications count
            const unreadRef = admin.database().ref(`users/${whoSentIt}/notifications/unread`);
            const unreadSnapshot = await unreadRef.once("value");
            const unreadCount = unreadSnapshot.val() || 0;

            await unreadRef.set(unreadCount + 1);
         }

         return res.json({ success: true, message: "Note liked!" });
      }
   } catch (error) {
      console.error("Error liking note: ", error);
      return res.status(500).send({ error: "Internal server error." });
   }
});

// export the express app wrapped in functions.https.onRequest
exports.likeNote = functions.https.onRequest(app);