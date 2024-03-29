import { createError } from "../error.js"
import User from "../models/users.js"

export const update= async(req,res,next)=>{
    if(req.params.id === req.user.id){
try{
const updatedUser= await User.findByIdAndUpdate(req.params.id,{
    $set:req.body
},{
    new:true
});
res.status(200).json(updatedUser)
}
catch(err){
next(err)
}
    }else{
        return next(createError(403,"You can update only your account!"))
    }
}

export const getUser=async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user) 
    } catch (err) {
        next(err)
    }
} 

export const deleteUser= async (req,res,next)=>{
    if(req.params.id===req.user.id){
        try{
await User.findByIdAndDelete(
    req.params.id,
);
res.status(200).json("User deleted");
        }
        catch(err)
        {
            next(err);
        }
    }else{
        return next(createError(403,"You can only delete your account"))
    };
}
export const subscribe=                         
async(req,res,next)=>{
    try{
await User.findByIdAndUpdate(req.user.id,{
    $push:
    {subscribedUsers:req.params.id}
});
res.status(200).json("Subscription successful.")
    }catch(err){
        next(err)

    }
    
}
export const unsubscribe=async (req,res,next)=>{
    try{
try{
await User.findByIdAndUpdate(req.user.id,{
    $pull:
    {subscribedUsers:req.params.id}
});
await User.findByIdAndUpdate(req.params.id,{
    $inc:
    {subscribers:-1},
});

res.status(200).json("Unsubscribed");
}catch(err){
next(err);

}
    }catch(err){
next(err)
    }
    
}
export const like=async(req,res,next)=>{
    const id=req.user.id;
    const videoId=req.params.videoId;

try{
await  VideoColorSpace.findByIdAndUpdate(videoId,{
    $addToSet:{likes:id},
    $pull:{dislike:id}
})
res.status(200).json("Liked")
}catch(err){
next(err)
}

    
}
export const dislike=async(req,res,next)=>{
    const id=req.user.id;
    const videoId=req.params.videoId;
    try{
        await VideoColorSpace.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("The Video has been disliked.")
    }catch(err){
next(err)
    }
}