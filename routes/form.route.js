import express from 'express';
import { createForm, deleteForm, getForms } from '../controllers/form.controller.js';
import isLoggedIn from '../middleware/auth.js';

const router = express.Router();

router.post('/createform', isLoggedIn, createForm);
router.get('/getforms', isLoggedIn, getForms);
router.delete('/deleteform/:id', isLoggedIn, deleteForm);

export default router;
