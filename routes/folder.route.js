import express from 'express'
import { createFolder, getFolders } from '../controllers/folder.controller.js';
const router = express.Router();
import isLoggedIn from '../middleware/auth.js'

router.post('/createfolder',isLoggedIn,createFolder)
router.get('/allfolders',isLoggedIn,getFolders)

export default router;