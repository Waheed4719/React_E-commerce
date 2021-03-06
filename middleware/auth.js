const jwt = require('jsonwebtoken')

function auth(req,res,next){

    var token = req.headers['authorization'];
    
    if (token){
        
        var token = token.split(" ");
        token = token[1];
        
        
        try{
            const decoded = jwt.verify(token, 'SECRET');
            console.log(decoded)
            var foundUser = {}
            User.findOne({_id: decoded._id,role:decoded.role})
            .then( user => {
                
                if(user){
                        req.user = decoded
                        next()
                }
                else{
                    res.status(404).json({error: 'user not found'})
                }
            })
            
        }
        catch(e){
            res.status(400).json({error: 'Token is not valid'})
        }
     

    }
    else{
        res.status(401).json({error: 'Not Authorized.'})
    }


}

module.exports = auth