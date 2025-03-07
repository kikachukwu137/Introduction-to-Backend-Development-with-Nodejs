import express from 'express';
import ErrorWithStatus from './exception/errorWithStatus.js';
import { globalErrorHandler } from './middleware/middleware.tour.js';
import tourRouter from './routes/tour.routes.js';
import userRouter from './routes/user.routes.js';
import morgan from 'morgan'


const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json())

app.use("/api/v1/tours",tourRouter)
app.use("/api/v1/users",userRouter)
app.get("/home",(req,res)=>{
    res.status(200).json({message: "home"})

})
app.use('*',(req,res,next)=>{
    // res.status(404).json({
    //     status: 'fail',
    //     message: `file does not exist in this ${req.originalUrl}`})
        // const err = new Error(`cant find ${req.originalUrl} on this server`)
        // err.statusCode = 404
        // err.status = 'fail'
        // next(err)
    next(new ErrorWithStatus(`cant find ${req.originalUrl} on this server`,404))
})

//express error handling middleware
app.use(globalErrorHandler)



export default app;
