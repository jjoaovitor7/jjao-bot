require("dotenv").config({ path: ".env" });

module.exports.prefix = process.env.PREFIX;

module.exports.firebase_config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
}

module.exports.token = process.env.TOKEN;