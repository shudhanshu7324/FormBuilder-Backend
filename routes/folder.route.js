import express from 'express'
import { createFolder } from '../controllers/folder.controller.js';
const router = express.Router();
import isLoggedIn from '../middleware/auth.js'

router.post('/createfolder',isLoggedIn,createFolder)

export default router;