import JWT from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

// protected routes token base
export const requireSignIn = async (req, res, next) => {
  
  try {
    // console.log('-------------------test for authorization'.req.headers.authorization)
    const decode =await JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user=decode
    next();
  } catch (error) {
    console.log('no login data inside browser localstorage',error)
  }
};
export const isAdmin=async(req,res,next)=>{
    try {
      const user=await UserModel.findById(req.user._id)  
      if(user.role!==1){
        return res.status(401).send({
            success:false,
            message:"not an admin page"
        })
      }else{
        req.admin=true
        next()
      }
    } catch (error) {
        console.log(error)
    }
}
