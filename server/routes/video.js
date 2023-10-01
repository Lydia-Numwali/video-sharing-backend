import express from "express"; 
import {addVideo,addView,trend,random,sub, getByTag, search} from "../controllers/Videos.js"
import { verifyToken } from "./verifyToken.js";

const router=express.Router()
 //create a video

router.post('/',verifyToken,addVideo)

router.put('/:id',verifyToken,addVideo)

router.delete('/:id',verifyToken,addVideo)

router.get('/find/:id',addVideo)

router.put('/view/:id',addView)

router.get('/trend',trend)

router.get('/random',random)

router.post('/sub',verifyToken,sub)

router.get("/tags",getByTag)

router.post('/search',search )





export default router;