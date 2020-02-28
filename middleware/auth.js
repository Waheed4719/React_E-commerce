const jwt = require('jsonwebtoken')

function auth(req,res,next){

    var token = req.headers['authorization'];
    console.log(req.headers)
    if (token){
        
        var token = token.split(" ");
        token = token[1];
        console.log(token)
       jwt.verify(token, 'SECRET',function  (err, decoded){
           
            if (err){
                console.log(err)
                res.status(400).json({error: 'token is not valid'})
                
            } else {
                User.findOne({_id: decoded._id,role:decoded.role})
                .then((req,res)=>{
                    req.user = decoded;
                    next();
                })
               
            }
        });
    }
    else{
        res.status(401).json({error: 'Not Authorized. Refresh the page!'})
    }


}

module.exports = auth