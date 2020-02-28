const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./models/User')
const Admin = require('./models/Admin')

const opts = {}
opts.jwtFromRequest = req.headers['authorization'].split(" ")[1];
// ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'SECRET';

module.exports = (userType,passport) => {
   
    passport.use(new JwtStrategy  (opts, (payload,done)  => {
        console.log(payload)
        console.log(userType)
        if(userType==="auth"){
            console.log('auth'+ userType)
             User.findOne({_id: payload._id})
            .then(user => {
                if(!user) {
                    return done(null,false)
                }
                else {
                    console.log(user)
                    return done(null,user)
                }
            })
            .catch(error => {
                console.log(error)
                return done(error)
            })
        }
        else if(userType==="admin"){
            
            console.log('admin'+ userType)
            Admin.findOne({_id: payload._id})
            .then(admin => {
                if(!admin) {
                    return done(null,false)
                }
                else {
                    return done(null,admin)
                }
            })
            .catch(error => {
                console.log(error)
                return done(error)
            })
        }
     





    }
    
    ))
}