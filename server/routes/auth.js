import express from "express"; 
import { signup,signin,googleAuth} from "../controllers/auth.js"

const router=express.Router()

//create a user
router.post('/signup',signup)

//sigin

router.post('/signin',signin)

//GOOGLE AUTH

router.post('/googleAuth',googleAuth)
export default router;