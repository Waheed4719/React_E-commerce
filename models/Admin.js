const mongoose = require('mongoose'),
      schema = mongoose.Schema;

const adminSchema = new schema({
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
    timestamp: {
        type: Date,
        default: Date.now
    },
    role: {
        type: Number,
        default: 1
    },
    post: [{
        type: schema.Types.ObjectId,
        ref: 'Posts'
    }]
    
})


  module.exports = Admin = mongoose.model('Admin',adminSchema)    