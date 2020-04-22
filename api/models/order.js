const mongoose = require('mongoose');


//creating schemas for DB.

//u need to use ref below;//Reference
//u can use required:true but using default is a good logical expression in this case.
const orderSchema = mongoose.Schema({

       _id: mongoose.Schema.Types.ObjectId,
       product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product',required : true},
       quantity: {type: Number, default: 1}

});


//export to routes/products
module.exports = mongoose.model('Order',orderSchema);