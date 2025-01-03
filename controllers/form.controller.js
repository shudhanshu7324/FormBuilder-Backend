import Form from "../models/standalone.model.js";
import Folder from "../models/folder.model.js";
import User from "../models/user.model.js";

export const createForm = async (req, res) => {
  try {
    const { name, folderId } = req.body;
    const userId = req.headers.userid;
    if (!name) {
      return res.status(400).json({ message: "Form name is required" });
    }

    const user = await User.findById(userId); // Assuming `req.user` has the user's ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFormExist = await Form.findOne({ name, userId});
    if (isFormExist) {
      return res.status(400).json({ message: "Form already exists with this name" });
    }

    const newForm = await Form.create({
      name,
      userId,
      folderId: folderId || null,
    });

    if (folderId) {
      const folder = await Folder.findById(folderId);
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      folder.forms.push(newForm._id);
      await folder.save();
    }

    return res.status(200).json({ message: "Form created successfully", id: newForm._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getForms = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const forms = await Form.find({ userId });
    if (!forms.length) {
      return res.status(404).json({ message: "No forms found for this user" });
    }
    return res.status(200).json({ forms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    if (form.folderId) {
      const folder = await Folder.findById(form.folderId);
      if (folder) {
        folder.forms = folder.forms.filter((formId) => formId.toString() !== id);
        await folder.save();
      }
    }

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
