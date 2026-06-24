import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const prefix = process.env.PREFIX!;

export const firebase_config = {
  apiKey: process.env.APIKEY!,
  authDomain: process.env.AUTHDOMAIN!,
  projectId: process.env.PROJECTID!,
  storageBucket: process.env.STORAGEBUCKET!,
  messagingSenderId: process.env.MESSAGINGSENDERID!,
  appId: process.env.APPID!,
};

export const token = process.env.TOKEN!;

export default { prefix, firebase_config, token };
