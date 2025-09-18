import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("👍🏻 MongoDB connected ");
    } catch (error) {
        console.log("👎🏻 MongoDB connection error ", error);
        process.exit(1); // It will exit the process with a status of 1 and stop the application from running. It is  used to handle uncaught exceptions and errors.
    }
};

export default connectDB;