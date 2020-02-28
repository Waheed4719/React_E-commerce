const Product = require('./../models/Product.js')



module.exports = {

    getProducts(req,res){
        Product.find()
        .then(prod => res.status(200).json(prod) )
    },

    addProduct(req,res){
        const {title, price, images, description} = req.body
        console.log(req.body)
        const newProd = new Product()
        newProd.title = title
        newProd.price = price
        newProd.images = images
        newProd.description = description
        newProd.save()
        .then(savedProd => {
            console.log(savedProd)
            res.status(200).json({success:true,savedProd})})
        .catch(err => res.status(400).json(err))
        
    },

    deleteProduct(req,res){

    },

    


}