
//global error handler

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.` 
    console.log(message)
    return new ErrorWithStatus(message,400)
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
            status: err.status,
            message: err.message
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

export const globalErrorHandler =  ((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
        sendErrorDevelopment(err,res)
       

    }else if(process.env.NODE_ENV === 'production'){
        let error = {...err};
        if(error.name === 'CastError') error = handleCastErrorDB(error)

        sendErrorProduction(error,res)
        
    }

   

})
