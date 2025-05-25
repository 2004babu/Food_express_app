const admin = require("firebase-admin");

const servireCode = require("../firebaseAdmin.json");

admin.initializeApp({ credential: admin.credential.cert(servireCode) });

module.exports = admin;
