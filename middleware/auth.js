const jwt = require('jsonwebtoken')

function auth(req,res,next){

    var token = req.headers['authorization'];
    
    if (token){
        
        var token = token.split(" ");
        token = token[1];
        
   
        try{
            const decoded = jwt.verify(token, 'SECRET');
            var foundUser = {}
            User.findOne({_id: decoded._id,role:decoded.role})
            .then( user => foundUser = user )
            if(foundUser){
                req.user = decoded
                next()
            }
        }
        catch(e){
            res.status(400).json({error: 'token is not valid'})
        }
     

    }
    else{
        res.status(401).json({error: 'Not Authorized.'})
    }


}

module.exports = auth