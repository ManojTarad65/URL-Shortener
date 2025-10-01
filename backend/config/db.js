// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("👍🏻 MongoDB connected ");
//     } catch (error) {
//         console.log("👎🏻 MongoDB connection error ", error);
//         process.exit(1); // It will exit the process with a status of 1 and stop the application from running. It is  used to handle uncaught exceptions and errors.
//     }
// };

// export default connectDB;
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env");
}

if (process.env.NODE_ENV === "development") {
  // In dev, use a global variable to preserve the connection
  if (!(global)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global)._mongoClientPromise = client.connect();
  }
  clientPromise = (global)._mongoClientPromise;
} else {
  // In production, just create a new client
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
