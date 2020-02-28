const mongoose = require('mongoose'),
      schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    image:{
        type: String
    },
    
    cart:{
        type: Array,
        default: []
    },

    history: {
        type: Array,
        default: []
    }
    
})


  module.exports = User = mongoose.model('User',userSchema)    