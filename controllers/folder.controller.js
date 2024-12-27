import Folder from "../models/folder.model.js";
import Form from "../models/standalone.model.js";
import User from "../models/user.model.js";

export const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Folder name is required" });
    }
    const isFolderExist = await Folder.findOne({ name });
    const user = await User.findOne({ email: req.user.email });
    if (isFolderExist) {
      return res
        .status(400)
        .json({ message: "Folder already exist with this name" });
    } else {
      const newFolder = await Folder.create({
        name,
        userId: user._id,
      });

      return res
        .status(200)
        .json({ message: "Folder created successfully", id: newFolder._id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFolders = async (req, res) => {
  try {
    const userId = req.headers.userid;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const folders = await Folder.find({ userId });
    if (!folders.length) {
      return res.status(404).json({ message: "No folder found for this user" });
    }
    return res.status(200).json({ folders });
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params; // Folder ID from the route parameter

    // Find and delete the folder
    const folder = await Folder.findByIdAndDelete(id);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Delete all forms within the folder
    await Form.deleteMany({ folderId: id });

    res.status(200).json({ message: "Folder and its forms deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
