import express from 'express'
import { createForm } from '../controllers/form.controller.js';
const router = express.Router();
import isLoggedIn from '../middleware/auth.js'

router.post('/createform',isLoggedIn,createForm)

export default router;
