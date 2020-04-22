const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');


const mongoose = require('mongoose');


//using mongoose connect NOTE: we have to put the DB user password into an environment variable
//not advisable to hardcode the password.
//then add a second argument to this connect function for using MOngoose.
mongoose.connect('mongodb+srv://u-user:' + process.env.MONGO_ATLAS_PASSWORD +'@node-first-rest-ouwo9.mongodb.net/test?retryWrites=true&w=majority',
{

  useMongoClient: true


});

mongoose.Promise = global.Promise;




//using morgan framework.default logging
app.use(morgan('dev'));

//function to make the uploads folder publicy avaialble.
app.use('/uploads', express.static('uploads'))

//parse body of incoming requests//URL encoded data/JSON(true allows you to parse RICH data, while false parses simple data)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());






//handle CORS errors. It can be restricted by replacing the start (*)//with any website you 
// want to give access.Typically for any
app.use((req,res,next) =>{

  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS'){
  
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
     return res.status(200).json;
     
  }

next();

});





//routes which handle requests.
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);



//creating and handling errors1
app.use((req,res,next)=>{
   
    const error= new Error('not found! peace');

    error.status = 404;
    next(error);


})

//creating and handling errors2
app.use((error,req,res,next)=>{

  res.status(error.status|| 500);
  res.json({

     error:{

        message:error.message
     }

  });



});




// app.use((req,res,next) =>{

//   res.status(200).json()


  
// });
//use(); sets up  middleware, an incoming request has to go throught the use method;
//it can be a function or an ARROW function, request. response, special next FUNCTION.


module.exports = app;