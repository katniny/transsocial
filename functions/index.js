const functions = require("firebase-functions/v2");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));

// test
exports.thisIsATest = functions.https.onRequest((req, res) => {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "GET, POST");

   // pre-flight requests
   if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).send("");
   }

   // get requests
   if (req.method === "GET") {
      res.send({ message: "hello world" });
   } else {
      res.status(405).send({ error: "Method Not Allowed" });
   }
});