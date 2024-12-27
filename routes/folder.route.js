import express from 'express'
import { createFolder, deleteFolder, getFolders } from '../controllers/folder.controller.js';
const router = express.Router();
import isLoggedIn from '../middleware/auth.js'

router.post('/createfolder',isLoggedIn,createFolder)
router.get('/allfolders',isLoggedIn,getFolders)
router.delete('/deletefolder/:id', isLoggedIn, deleteFolder);

export default router;