import express from 'express'
import { createUser } from '../controllers/SignUp.js'
import { login } from '../controllers/login.js';

const router=express.Router();

router.post('/register',createUser)
router.post('/login',login)


export default router