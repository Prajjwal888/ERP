import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.error("Error connecting to DB:", error.message);
    process.exit(1); // Exit process with failure
  }
};
