import ErrorWithStatus from "../exception/errorWithStatus.js";
import {promisify} from 'util'
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const tourMiddleWare = (req,res,next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

    next()
}




//global error handler



 
const sendErrorDevelopment = (err,res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error:err,
        message: err.message,
        stack: err.stack

    })

}

const sendErrorProduction = (err,res) => {
    //Operational, trusted error: send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message : err.message,
            data: "error"
        
        })

    }//programming or unknown error
    else{
        // log error
        console.error('Error')
        //send generic message
        res.status(500).json({
            status: 'error',
            message: 'something went very wrong'
        })
    }
   

}
// function handleCastErrorDB(err){
//     const message = `Invalid ${err.path}: ${err.value}.` 
//     console.log(message)
//     return new ErrorWithStatus(message,400)
// }

// export const globalErrorHandler =  ((err,req,res,next)=>{
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error'

//     if(process.env.NODE_ENV === 'development'){
//         sendErrorDevelopment(err,res)
       

//     }else if(process.env.NODE_ENV === 'production'){
//         // let error = {...err}; 
//         let error = Object.assign({},err) //it is more preferable than  spreading because spreading only copy top valve properties
//         if(error.name === 'CastError') {error = handleCastErrorDB(err)}

//          sendErrorProduction(error,res)
        
//     }

   

// })
// ✅ Use function declaration
// function handleCastErrorDB(err) { 
//     const message = `Invalid ${err.path}: ${err.value}.`;
//     return new ErrorWithStatus(message, 400);
// }
// const handleDuplicateFieldsDB = err => {
//     const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
//     console.log(value);
  
//     const message = `Duplicate field value: ${value}. Please use another value!`;
//     return new AppError(message, 400);
//   };
  
// export const globalErrorHandler = ((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';

//     if (process.env.NODE_ENV === 'development') {
//         sendErrorDevelopment(err, res);
//     } else if (process.env.NODE_ENV === 'production') {
//         let error = Object.assign({}, err); // ✅ Ensures a proper copy

//         if (err.name === 'CastError') { 
//             error = handleCastErrorDB(error); // ✅ Use function correctly
//         }
//     if (error.code === 11000) error = handleDuplicateFieldsDB(error);


//         sendErrorProduction(error, res);
//     }
// });
function handleCastErrorDB(err) { 
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new ErrorWithStatus(message, 400);
}

function handleDuplicateFieldsDB(err) {
    const field = Object.keys(err.keyValue)[0]; // Get duplicate field
    const value = err.keyValue[field]; // Get duplicate value

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new ErrorWithStatus(message, 400);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.error).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`

    return new ErrorWithStatus(message,400)




    
}

export const globalErrorHandler = ((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDevelopment(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        // let error = { ...err }; // ✅ Ensure proper copying of error properties
        let error = { ...err, message: err.message };


        if (error.name === 'CastError') { 
            error = handleCastErrorDB(error); // ✅ Correct function call
        }

        if (error.code === 11000) { 
            error = handleDuplicateFieldsDB(error); // ✅ Handle duplicate key error
        }
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);
          if (error.name === 'JsonWebTokenError') error = handleJWTError();
          if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProduction(error, res);
    }
});






//AUTHENTICATION

export const protect   = catchAsync(async(req,res,next) =>{
    //Getting token and check if it exist
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next( new ErrorWithStatus('Invalid TOKEN please login to get access',401))
    }
    //verify token
    //2️⃣ What is promisify?
    // promisify is a function from Node.js util module that converts callback-based functions into Promise-based functions.
    // Since jwt.verify expects a callback, we use promisify to turn it into a function that returns a Promise.
    // 3️⃣ What Does promisify(jwt.verify) Do?
    // promisify(jwt.verify) creates a new function that can be used with await.
    // Instead of using a callback, it returns a Promise, which we can await.
     const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    // const decoded =jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         console.error("Token verification failed:", err.message);
    //         return;
    //     }
    //     // console.log("Decoded Token:", decoded);
    // });

    //check if user still exist
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return next( new ErrorWithStatus('This User doesnt exist', 401))
    }


    // check if user changed password after the token was issued
   if(currentUser.changedPasswordAfter(decoded.iat)){
        return next( new ErrorWithStatus('please login again ,you just reset your password',401))
   }
   //
   req.user = currentUser;
    next()
})
//note authentication comes before authorization
export const restrictTo = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorWithStatus('you do not have permission tp perform this action',403))
        }
        next()
    }
}

