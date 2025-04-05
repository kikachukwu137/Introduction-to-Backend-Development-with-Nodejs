import { fileURLToPath } from 'url';
import { dirname } from 'path';



import express from 'express';
import path from 'path'
import ErrorWithStatus from './exception/errorWithStatus.js';
import { globalErrorHandler } from './middleware/middleware.tour.js';
import tourRouter from './routes/tour.routes.js';
import userRouter from './routes/user.routes.js';
import viewRoute from './routes/views.routes.js';
import reviewRouter from './routes/review.route.js';
import morgan from 'morgan'
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

//serving static files
app.use(express.static(path.join(__dirname,'public')))

//global middleware
//set security http headers
app.use(helmet())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
const limiter = rateLimit({
    max : 100, // request from the same ip
    windowMs: 60 *60 * 1000, //milliseconds
    message: 'too many request from this IP, '
})
app.use('/api', limiter)
app.use(express.json())


app.use("/api/v1/tours",tourRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/reviews",reviewRouter)
app.use("/",viewRoute)

app.get('*',(req,res)=>{
    res.status(404).render('Error')
})


//prevent parameter pollution
app.use(hpp(
    {
        whitelist: ['duration','ratingsQuantity', 'price','difficulty','ratingsAverage']
    }
))
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
