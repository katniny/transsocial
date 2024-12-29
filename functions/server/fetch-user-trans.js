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

// apply rate limit: max 100 reqs/hr per domain
const limiter = rateLimit({
   windowMs: 60 * 60 * 1000, // 1 hour
   max: 100,
   keyGenerator: (req) => req.headers["origin"] || req.ip,
   message: {
      error: "Too many requests, please try again later.",
   },
});
app.use(limiter);

app.use((req, res, next) => {
   // only allow transs.social to access this data
   const allowedDomain = "transs.social";
   const requestHost = req.get("host");
   const origin = req.headers["origin"];

   if (requestHost && !requestHost.includes(allowedDomain) && origin && !origin.includes(allowedDomain)) {
      //if (isEmulator && ) {}
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
            error: "Username is required. If you attempted to use a UID, please use a username instead." 
         });
      }

      // fetch user uid from realtime db
      const userRef = db.ref(`taken-usernames/${userId}/user`);
      const user = await userRef.once("value");

      if (!user.exists()) {
         return res.status(404).send({ error: "User not found." });
      }

      // fetch user uid from realtime db
      const userDataRef = db.ref(`users/${user.val()}`);
      const snapshot = await userDataRef.once("value");

      // send user data
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

      const userData = snapshot.val();

      return res.status(200).send(userData);
   } catch (error) {
      console.error("Error fetching user: ", error);
      return res.status(500).send({ error: "Internal server error." });
   }
});

// export the express app wrapped in functions.https.onRequest
exports.fetchUser = functions.https.onRequest(app);