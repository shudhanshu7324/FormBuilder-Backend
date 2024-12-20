import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDb;
