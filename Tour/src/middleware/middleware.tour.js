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
            message: err.message
        })

    }//programming or unknown error
    else{
        // log error
        console.error('Error',err)
        //send generic message
        res.status(500).json({
            status: 'error',
            message: 'something went very wrong'
        })
    }
   

}

export const globalErrorHandler =  ((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === 'development'){
        sendErrorDevelopment(err,res)
       

    }else{
        sendErrorProduction(err,res)
        
    }

   

})

export const protect   = catchAsync(async(req,res,next) =>{
    //Getting token and check if it exist
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next( new ErrorWithStatus('invalid  please login to get access',401))
    }
    //verify token
    // const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    const decoded =jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err.message);
            return;
        }
        // console.log("Decoded Token:", decoded);
    });

    //check if user still exist
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return next( new ErrorWithStatus('the user doesnt exist', 401))
    }


    // check if user changed password after the token was issued
   if(currentUser.changedPasswordAfter(decoded.iat)){
        return next( new ErrorWithStatus('please login again',401))
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

