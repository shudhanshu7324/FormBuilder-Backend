import express from "express";
import { createFolder, deleteFolder, getFolders } from "../controllers/folder.controller.js";
import isLoggedIn from "../middleware/auth.js";

const router = express.Router();

router.post("/createfolder", isLoggedIn, createFolder);
router.get("/allfolders", isLoggedIn, getFolders);
router.delete("/deletefolder/:id", isLoggedIn, deleteFolder);

export default router;