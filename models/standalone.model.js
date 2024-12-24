import mongoose from "mongoose";
const standaloneFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", standaloneFormSchema);
export default Form;
