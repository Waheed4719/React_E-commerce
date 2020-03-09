const jwt = require('jsonwebtoken'),
      loginValidator = require('./../validators/loginValidator'),
      registerValidator = require('./../validators/registerValidator'),
      User = require('./../models/User'),
      bcrypt = require('bcrypt');
      

module.exports = {

            Login(req,res){
                const {email,pass} = req.body
                let validate = loginValidator({email,pass})
                let error = validate.error
                if(!validate.isValid){
                    res.status(400).json(error)
                }
                else{
                    User.findOne({email:email})
                    .then(user => {
                        if(user){
                            

                            if(bcrypt.compareSync(pass, user.pass)) {
                            let token = jwt.sign({_id: user._id,email:user.email,pass:user.pass,name:user.name,role:user.role,timestamp:user.timestamp},'SECRET',{expiresIn: '7d'})
                            res.status(200).json({token: `Bearer ${token}`,success:true, cart: user.cart, history: user.history})}
                            else{
                                res.status(400).json({error:"passwords don't match"})
                            }
                        }
                        else{
                            res.status(400).json({error: "user was not found"})
                        }
                    }).catch(error=> res.status(404).json(error))
                }
            },

            Register(req,res){
               
                const {email,pass,name,image} = req.body
                let validate = registerValidator({name,email,pass})
                let error = validate.error
                if(!validate.isValid){
                    res.status(400).json(error)
                }
                else{
                    User.findOne({email:email})
                    .then(user => {
                       
                        if(user){
                            res.status(400).json({error:"User already exists!"})
                        }
                        else{
                            
                            let user = new User()
                            user.email = email;
                            user.name = name;
                            if(image !== null){
                                user.image = image;
                            }
                            
                            let hash = bcrypt.hashSync(pass,10)
                            user.pass = hash;
                            user.save().then(User => res.status(200).json({User,success:true})).catch(error=> res.status(400).json(error))
                        }
                    })                    
                }
                
            },
            
            Add_To_Cart(req,res){
                const {id} = req.body
                const prod_id = id
                
                user = req.user._id
                User.findOne({_id: user}
                ,(err, userInfo) =>{
                    let duplicate = false

                    userInfo.cart.forEach((cartInfo)=>{
                        if(cartInfo.id === prod_id){
                            duplicate = true
                        }
                    })

                    if(duplicate){
                        
                        User.findOneAndUpdate (
                            { _id: req.user._id, "cart.id": prod_id },
                            { $inc: { "cart.$.quantity": 1 } },
                            { new: true },
                            
                                () => {
                               
                                if(err) return res.json({success: false, err})
                                
                                    User.findOne({_id: req.user._id})
                                    
                                    .then(user =>{
                                        
                                        res.status(200).json(user.cart) })
                                   
                                
                            }
                        )
                    } else {
                        User.findOneAndUpdate(
                            {_id: req.user._id},
                            {
                                $push: {
                                    cart: {
                                        id: prod_id,
                                        quantity: 1,
                                        date: Date.now()
                                    }
                                }
                            },
                            {new: true},
                            (err, userInfo) => {
                                if(err) return res.json({success: false, err})
                                console.log(userInfo.cart)
                                User.findOne({_id: req.user._id})

                                .then(user =>{
                                    console.log(user.cart)
                                    res.status(200).json(user.cart)
                                
                                } )
                                
                            }
                        )
                    }


                })
            },

            getCartAndHistory(req,res){
                const {id} = req.query
                
                User.findOne({_id: id})
                .then(user=>res.status(200).json(user))
                .catch(error=>res.status(404).json(error))
            }
         



}