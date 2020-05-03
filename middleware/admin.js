const jwt = require('jsonwebtoken')

function admin(req,res,next){
   
    var token = req.headers['authorization'];
    console.log('in middleware')
    if (token){
        console.log(token)
        var token = token.split(" ");
        token = token[1];
        try{
            const decoded = jwt.verify(token, 'SECRET');
            console.log(decoded)
            var foundAdmin = {}
            Admin.findOne({_id: decoded._id,role:decoded.role})
            .then( user => {
                if(user){
               
                        req.admin = user
                        console.log(req.admin)
                        next()

                }
                else{
                    res.status(404).json({error:"user not found"})
                }
            })
            
        }
        catch(e){
            res.status(400).json({error: 'token is not valid'})
        }
    }
    else{
        res.status(400).json("error")
    }

}

module.exports = admin