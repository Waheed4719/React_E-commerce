const jwt = require('jsonwebtoken'),
      loginValidator = require('./../validators/loginValidator'),
      registerValidator = require('./../validators/registerValidator'),
      Admin = require('./../models/Admin'),
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
                    Admin.findOne({email:email})
                    .then(Admin => {
                        if(Admin){
                            

                            if(bcrypt.compareSync(pass, Admin.pass)) {
                            let token = jwt.sign({_id: Admin._id,email:Admin.email,pass:Admin.pass,name:Admin.name,role:Admin.role,timestamp:Admin.timestamp},'SECRET',{expiresIn: '10m'})
                            res.status(200).json({token: `Bearer ${token}`,success:true})}
                            else{
                                res.status(400).json({error:"passwords don't match"})
                            }
                        }
                        else{
                            res.status(400).json({error: "Admin was not found"})
                        }
                    }).catch(error=> res.status(404).json(error))
                }
            },

            Register(req,res){

                const {email,pass,name} = req.body
                
                let validate = registerValidator({name,email,pass})
                let error = validate.error
                if(!validate.isValid){
                    res.json(error)
                }
                else{

                    Admin.findOne({email:email})
                    .then(adminUser => {
                        
                        if(adminUser){
                            res.json({error:"Admin already exists!"})
                        }
                        else{
                            
                            let admin = new Admin()
                            admin.email = email;
                            admin.name = name;
                            let hash = bcrypt.hashSync(pass,10)
                            admin.pass = hash;
                            admin.save().then(admin => res.json({admin,success:true})).catch(error=> res.status(400).json(error))
                        }
                    })                    
                }
                
            },

            getAdmins(req,res){
                
                Admin.find()
                .then(Admins => {
                    if(Admins){
                        res.json(Admins)
                    }
                    else{
                        res.json({message: "No Admins Found!"})
                    }
                })
                .catch(error => res.status(400).json(error))
            },

            getUsers(req,res){
                User.find()
                .then(users => {
                    if(users){
                        res.json(users)
                    }
                    else{
                        res.json({message: "No Users Found!"})
                    }
                })
                .catch(error => res.status(400).json(error))
            }



}