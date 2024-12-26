import Folder from "../models/folder.model.js";
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
    // console.log(userId)

    const folders = await Folder.find({ userId });
    if (!folders.length) {
      return res.status(404).json({ message: "No folder found for this user" });
    }
    return res.status(200).json({ folders: folders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


