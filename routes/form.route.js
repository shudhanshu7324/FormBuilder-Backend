import express from 'express'
import { createForm, getForms } from '../controllers/form.controller.js';
const router = express.Router();
import isLoggedIn from '../middleware/auth.js'

router.post('/createform',isLoggedIn,createForm)
router.get('/getforms',isLoggedIn,getForms)

export default router;
