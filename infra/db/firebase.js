const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const config = require("../../config");

const app = initializeApp(config.firebase_config);
const db = getFirestore(app);

module.exports = { db };
