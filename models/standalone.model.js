import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null, // Indicates the form is standalone if null
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

export default Form;
