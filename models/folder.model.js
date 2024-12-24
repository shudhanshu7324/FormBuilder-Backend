import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    forms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
      },
    ],
  },
  { timestamps: true }
);

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;
