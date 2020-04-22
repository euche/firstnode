const Product = require('../models/product');
const mongoose = require('mongoose');



//after find() function below, other QUERY function like where() and limit()(for smaller no. of data and pagination)can be used...
exports.products_get_all = (req,res,next) => {


    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        
        const response = {
           count:docs.length, 
           products:docs.map(doc =>{
           
            return{
                 
                name: doc.name,
                price: doc.price,
                productImage: doc.productImage,
                _id:doc._id,
                request:{

                    type:'GET',
                    url:'http://localhost:3000/products/'+doc._id
                }
            
            }

           })

        };
        res.status(200).json(response);
 
    })
    .catch(err =>{

        console.log(err)
        res.status(500).json({

            error: err
        })
    
    });



}

// it should be just slash...to prevent repetition.


exports.products_create_product = (req,res,next) => {


    console.log(req.file);
   
       //for creating a product model object
       const product = new Product({
   
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
   
   
       });
   
   
       //SAVE Function stores the product object in the database.
       product.save().then(result =>{
   
           console.log(result);
           res.status(201).json({
   
               message: 'created product successfully',
               createdProduct: {
            
                   name: result.name,
                   price: result.price,
                   _id: result._id,
   
                   request:{
                       type: 'GET',
                       url: 'http://localhost:3000/products/'+result._id
                   }
   
               }
      
            });
   
       }).catch(err =>{
   
           console.log(err)
           res.status(500).json({
   
               error: err
           })
       
       });
   
   
      
   }

   exports.products_get_product = (req, res, next)=>{

    const id = req.params.productId;
    
    
    Product.findById(id).select('name price _id productImage').exec().then(doc =>{
    
           console.log("Fetched from Database", doc);
       
           if(doc){
    
            res.status(200).json({
                 
                product:doc,
                request: {
                      type: 'GET',
                      description:'GET_ALL_PRODUCTS',
                      url: 'http://localhost:3000/products'
    
                }
    
    
            });
    
           }else{
    
            res.status(404).json({message : "No valid Entry found for provided ID"});
    
           }
    
    
    
           
    
    }).catch(err => {
        
        console.log(err);
        res.status(500).json({error: err});
    });
    
    
    
    
    }

   exports.product_update_product =(req, res, next)=>{

    const id = req.params.productId;
    const updateOperations = {};
  
    for(const ops of req.body){

      updateOperations[ops.proptyName] =  ops.value;
    }


    Product.update({ _id: id}, {$set:updateOperations})
    .exec()
    .then(result =>{

        // console.log(result);
        res.status(200).json({
          
            message: 'Product of choice updated',
            request:{
              type: 'GET',
              url:'http://localhost:3000/products'+id
                
            }

        });


    })
    .catch(err =>{
 
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
    
    
    }