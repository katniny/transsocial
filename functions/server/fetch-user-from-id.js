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
   const requestHost = req.get("host");
   const origin = req.headers["origin"];

   if (requestHost && !requestHost.includes(allowedDomain) && origin && !origin.includes(allowedDomain)) {
      console.log("Request from host: ", requestHost);
      if (isEmulator && requestHost === "127.0.0.1:5001") {
         console.log("Allowing request from emulator. If you're not authorized to be here, please report this as a vulnerability bug privately to @katniny on Discord.");
      } else {
         return res.status(405).send({ error: "You are not authorized to access this! Please do not try again." });
      }
   }

   // only allow GET requests
   if (req.method !== "GET") {
      return res.status(405).send({ error: "Method not allowed. Only GET requests are allowed." });
   }
   next();
});

// define route
app.get("/", async (req, res) => {
   try {
      // get the username from the query params
      const userId = req.query.id;
      if (!userId) {
         return res.status(400).send({ 
            error: "UID is required. If you attempted to use a username, please use a UID instead." 
         });
      }

      // fetch user uid from realtime db
      const userRef = db.ref(`users/${userId}`);
      const snapshot = await userRef.once("value");

      if (!snapshot.exists()) {
         return res.status(404).send({ error: "User not found." });
      }

      // send user data
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

      const userData = snapshot.val();

      return res.status(200).send({
         uid: req.query.id,
         ...userData
      });
   } catch (error) {
      console.error("Error fetching user: ", error);
      return res.status(500).send({ error: "Internal server error." });
   }
});

// export the express app wrapped in functions.https.onRequest
exports.fetchUserFromId = functions.https.onRequest(app);