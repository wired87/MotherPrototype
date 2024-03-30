/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


import {onCall} from "firebase-functions/v2/https";
import {onDocumentWritten} from "firebase-functions/v2/firestore";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";


const functions = require('firebase-functions');

exports.myFunction = functions.https.onRequest((request, response) => {
  response.send("Hallo von meiner Cloud Function!");
});


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
