

const jwt=require('jsonwebtoken')

const Authentication=(req,res,next)=>{

   const token=req.headers.authorization 
    
   if(token){
    jwt.verify(token, 'jitendra', function(err, decoded) {
         
        if(decoded){
           
            req.body.UserId=decoded.UserId
           
            next()
        }else{
            res.send({"msg":"Invalid Token !",err})
        }
       
      });
   }else{
    res.send({"msg":"Please Login First !"})
   }
    
}



module.exports={
    Authentication
}