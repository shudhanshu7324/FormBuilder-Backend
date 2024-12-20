import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/formbuilder");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDb;
