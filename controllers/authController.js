const jwt = require('jsonwebtoken'),
      loginValidator = require('./../validators/loginValidator'),
      registerValidator = require('./../validators/registerValidator'),
      User = require('./../models/User'),
      Payment = require('./../models/Payment'),
      Product = require('./../models/Product'),
      bcrypt = require('bcrypt'),
      async = require('async')

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
                        var prod_price = ''
                        Product.findOne({_id: prod_id})
                        .then(prod => {
                            prod_price = prod.price
                            prod_title = prod.title
                           
                       
                        console.log(prod_price)
                        User.findOneAndUpdate(
                            {_id: req.user._id},
                            {
                                $push: {
                                    cart: {
                                        id: prod_id,
                                        title: prod_title,
                                        quantity: 1,
                                        price: prod_price,
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

                    }) 
                    }


                })
            },

            getCartAndHistory(req,res){
                const {id} = req.query
                
                User.findOne({_id: id})
                .then(user=>res.status(200).json(user))
                .catch(error=>res.status(404).json(error))
            },



            successfulPurchase(req, res){
                let history = [];
                let transactionData = {};
                console.log(req.user)
                console.log(req.body)
                //1.Put brief Payment Information inside User Collection 
                req.body.cartDetail.forEach((item) => {
                    history.push({
                        dateOfPurchase: Date.now(),
                        name: item.title,
                        id: item.id,
                        price: item.price,
                        quantity: item.quantity,
                        paymentId: req.body.paymentData.paymentID
                    })
                })
            
                //2.Put Payment Information that come from Paypal into Payment Collection 
                transactionData.user = {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email
                }
            
                transactionData.data = req.body.paymentData;
                transactionData.product = history
            
            
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $push: { history: history }, $set: { cart: [] } },
                    { new: true },
                    (err, user) => {
                        if (err) return res.json({ success: false, err });
            
                        
                        const payment = new Payment(transactionData)
                        
                        payment.save((err, doc) => {
                            if (err) return res.json({ success: false, err });
            
                            //3. Increase the amount of number for the sold information 
            
                            //first We need to know how many product were sold in this transaction for 
                            // each of products
            
                            let products = [];
                            doc.product.forEach(item => {
                                products.push({ id: item.id, quantity: item.quantity })
                            })
            
                            // first Item    quantity 2
                            // second Item  quantity 3
            
                            async.eachSeries(products, (item, callback) => {
                                Product.update(
                                    { _id: item.id },
                                    {
                                        $inc: {
                                            "sold": item.quantity
                                        }
                                    },
                                    { new: false },
                                    callback
                                )
                            }, (err) => {
                                if (err) return res.json({ success: false, err })
                                res.status(200).json({
                                    success: true,
                                    cart: user.cart,
                                    history: user.history,
                                    cartDetail: []
                                })
                            })
            
                        })
                    }
                )
            },

            removeFromCart(req, res){

                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        "$pull":
                            { "cart": { "id": req.query._id } }
                    },
                    (err, userInfo) => {
                      User.findOne({_id: req.user._id})
                        .then(user => {
                            console.log(user.cart)
                            res.status(200).json({
                                    
                                cart: user.cart
                            })
                        })

                               
                            
                    }
                )
            }
            


         



}