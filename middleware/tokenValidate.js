const jwt=require('jsonwebtoken')

const validateToken=async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization||req.headers.authorization;
    if(authHeader&&authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401).json({message:"User not authorized"});
                throw new Error("User not authorised")
            }
            // console.log(decoded);
            req.user=decoded.user;
            next()
        })
        if(!token){
            res.status(401).json({message:"User not authorized or token missing "});
            throw new Error("User not authorised or or token missing")
        }
    }
}

module.exports=validateToken