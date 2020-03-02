const jwt = require('jsonwebtoken')

function auth(req,res,next){
   
    var token = req.headers['authorization'];
    console.log('in middleware')
    if (token){
        console.log(token)
        var token = token.split(" ");
        token = token[1];
        jwt.verify(token, 'SECRET', function (err, decoded){
           
            if (err){
                res.status(400).json({msg: 'token is not valid'})  
            } else {
                console.log(decoded.role)
                Admin.findOne({_id: decoded._id,role:decoded.role})
                .then((req,res)=>{
                    req.admin = decoded;
                    next();
                })
                .catch(error=> res.status(403).json(error))
               
            }
        });
    }
    else{
        res.status(400).json("error")
    }

}

module.exports = auth