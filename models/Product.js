const mongoose = require('mongoose');
const schema = mongoose.Schema;


const productSchema = new schema({
    
    writer: { type: schema.Types.ObjectId, ref: 'User' },

    title: { type: String, maxlength: 50 },

    category: {type: String},

    description: {type: String},

    price: {type: Number, default: 0},

    images: {type: Array, default: [] },

    sold: {type: Number, default: 0}

}, {timestamps: true})

productSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

module.exports = Product = mongoose.model('Product', productSchema)