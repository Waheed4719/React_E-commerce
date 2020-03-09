const Product = require('./../models/Product.js')



module.exports = {

    getProducts(req,res){
        Product.find()
        .then(prod => res.status(200).json(prod) )
    },

    addProduct(req,res){

        console.log(req.admin)
        const {title, price, images, description} = req.body
        const newProd = new Product()
        newProd.title = title
        newProd.price = price
        newProd.images = images
        newProd.description = description
        newProd.save()
        .then(savedProd => {
            
            res.status(200).json({success:true,savedProd})})
        .catch(err => res.status(400).json(err))
        
    },
    getSingleProduct(req,res){
        
        let id = req.params.id
        Product.findOne({_id:id})
        .then(product=>{
            
            res.status(200).json(product)
        })
        .catch(error=>{
            res.status(404).json(error)
        })
    },

    deleteProduct(req,res){

    },

    


}