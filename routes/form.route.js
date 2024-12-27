import express from 'express'
import { createForm, deleteForm, getForms } from '../controllers/form.controller.js';
const router = express.Router();
import isLoggedIn from '../middleware/auth.js'

router.post('/createform',isLoggedIn,createForm)
router.get('/getforms',isLoggedIn,getForms)
router.delete('/deleteform/:id', isLoggedIn, deleteForm);

export default router;
