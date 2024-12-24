import Form from "../models/standalone.model.js";
import User from "../models/user.model.js";

export const createForm = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Form name is required" });
    }

    const isFormExist = await Form.findOne({ name });
    const user = await User.findOne({ email: req.user.email });
    if (isFormExist) {
      return res
        .status(400)
        .json({ message: "Form already exist with this name" });
    } else {
      const newForm = await Form.create({
        name,
        userId: user._id,
      });

      return res
        .status(200)
        .json({ message: "Form created successfully", id: newForm._id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
