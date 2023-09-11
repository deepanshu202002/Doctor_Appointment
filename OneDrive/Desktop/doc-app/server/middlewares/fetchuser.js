const  jwt=require('jsonwebtoken');
const JWT_SECRET="Deepanshuisagoodboy"

// const fetchuser = (req,res,next)=>{
//     // Get the user from the jwt token and id to req object
  
//   try{

//     const token =req.headers["authorization"].split(" ")[1]
//     jwt.verify(token,JWT_SECRET,(err,decode)=>{
//         if(err){
//             return res.status(200).send({
//                 message:"Auth failed",
//                 success:false,
//             });
//         }else{
//             req.body.userId = decode.id;
//             next();
//         }
            
//         }
//     );
// }catch(error){
//  console.log(error);
//  res.status(401).send({
//     message:"auth failed",
//     success:false,
// });
//     }
// };
const fetchuser = (req,res,next)=>{
    // Get the user from the jwt token and id to req object
    const token =req.headers["authorization"].split(" ")[1]
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user =data.user;
        
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})

    }
}

module.exports = fetchuser;