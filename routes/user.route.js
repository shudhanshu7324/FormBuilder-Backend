import express from 'express'
import { loginUser, registerUser, userName } from "../controllers/user.controller.js";
import isLoggedIn from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/username',isLoggedIn,userName)

export default router;