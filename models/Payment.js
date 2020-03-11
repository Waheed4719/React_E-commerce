const mongoose = require('mongoose'),
      schema = mongoose.Schema;

const paymentSchema = new schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }


}, { timestamps: true })

module.exports =  Payment  = mongoose.model('Payment', paymentSchema)

