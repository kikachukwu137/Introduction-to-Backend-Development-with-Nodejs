
//global error handler

import ErrorWithStatus from "../exception/errorWithStatus"

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.` 
    console.log(message)
    return new ErrorWithStatus(message,400)
}
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    
  
    const message = `Duplicate field value: ${value}. Please use another value!`;

    
    return new ErrorWithStatus(message,400)
}
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new ErrorWithStatus(message, 400)

}

 
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
            status: err.status || 400,
            message: err.message
        })

    }//programming or unknown error
    else{
        // log error
        // console.error('Error')
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
       

    }else if(process.env.NODE_ENV === 'production'){
        let error = {...err};
        if(error.name === 'CastError') error = handleCastErrorDB(error)
        if(error.name === 11000) error = handleDuplicateFieldsDB(error)
        if(error.name === 'ValidationError') error = handleValidationErrorDB(error)
        sendErrorProduction(error,res)
        
    }

   

})
