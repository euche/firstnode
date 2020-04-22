const mongoose = require('mongoose');


//creating schemas for DB.
//validate inputs; like it is done below;
const productSchema = mongoose.Schema({

       _id: mongoose.Schema.Types.ObjectId,
       name: {type: String, required: true},
       price: {type: Number, required: true},
       productImage: {type: String, required: true}

});


//export to routes/products
module.exports = mongoose.model('Product',productSchema);