const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');




//import user model...
const User = require('../models/user');

// hash password first then get the result and save to DB table.
router.post('/signup',(req,res,next) => {

  User.find({email: req.body.email}).exec()
  .then(user =>{
  
    if(user.length >= 1){

        return res.status(409).json({
               
            message:'Email has been created'

        });

    }else{

        bcrypt.hash(req.body.password,10,(err,hash) =>{

            if(err){
    
                return res.status(500).json({
                   error: err
    
                });
            }else{
    
                const user = new User({
    
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                
                
                
                });
    
                  user.save().then(result => {
                    
                    console.log(result);
                    res.status(201).json({
                     message: 'User created successfully'
    
                    });
    
                  }).catch(err =>{
    
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
    
                  });
    
    
    
            }
    
    
            
        })

    }



  })




});


//Sign in User function.


//using User model to find any user for a given email address. Process similar to the signup route. Can also use findOne() Mehtod.
router.post('/login',(req,res,next) => {

  User.find({email: req.body.email})
  .exec()
  .then(user  => {
     
       //if user stored in doc
        if(user.length < 1){

          return res.status(401).json({
             message: 'Auth failed'

          });

        }

        bcrypt.compare(req.body.password,user[0].password,(err,result) => {

           if (err) {
                 
                return res.status(401).json({

                   message: 'Auth failed'

                });    
                
           }

           if(result){

            //here we use the jwtsign() method.we use user from DB (email,password)
            //privatekey will add to envronment variable file,then another javascrpit object containing the expirsin method
            //we are omitting the callback to get token and using the jwtsignmethod as an object. Token set to one Hour

              const token = jwt.sign({
 
                   email: user[0].email,
                   userId: user[0]._id

              },process.env.JWT_PKEY,
              
              {
                expiresIn: "1h"

              }

              );

            return res.status(200).json({

              message: 'Auth successful',
              token: token

           }); 

          }

          res.status(401).json({

            message: 'Auth failed'

         });   


        });

        

  })
  .catch(err =>{

    console.log(err);
    res.status(500).json({
        error: err
    });

 });



});





//delete route:
router.delete("/:userId", (req,res,next)=>{
 User.remove({_id:req.params.userId}).exec()
 .then(result => {

   res.status(200).json({
       message: 'User has been deleted'
   })

 })
 .catch(err =>{

    console.log(err);
    res.status(500).json({
        error: err
    });

 });
 


});


module.exports = router;
