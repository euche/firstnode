const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Product = require('../models/product');

const multer = require('multer');

const Productscontroller = require('../controllers/products');


// to use the check auth function we import it
const checkAuth = require('../middleware/checkauth');





//multer for Uploading Images function.
// now in this project, the uploads folder we created is not publicy accesible. 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now())
    }
  });



  const fileFilter = (req, file, cb) =>{

    //code to reject a specific type of file.


    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){

      cb(null,true);
 

    }else{

        cb(null,false);

    }

  };


  const upload = multer({storage: storage,limits:{

      fileSize: 1024*1024*5

  },
      fileFilter: fileFilter
});





router.get('/', Productscontroller.products_get_all );

router.post('/', checkAuth , upload.single('productImage'), Productscontroller.products_create_product );





// place routes for a single product
//using express framework you set this up with ": followed by any name of your Choice"
router.get('/:productId', Productscontroller.products_get_product);


//set function  UNIQUE with mongoose
router.patch('/:productId', checkAuth, Productscontroller.product_update_product);
    

    router.delete('/:productId', checkAuth,(req, res, next)=>{
  
        const id = req.params.productId;

        Product.remove({_id: id}).exec()
        .then(result =>{
          
            res.status(200).json({

                message:'Product delected',
                request:{
                    type:'POST',
                    url:'http://localhost:3000/products',
                    body:{ name: 'String', price: 'Number'}

                }

            });

        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({

                error : err
            });
 

        });
   
         
         
         });


module.exports = router;