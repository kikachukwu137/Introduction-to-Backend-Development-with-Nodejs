import express from 'express';


import tourRouter from './routes/tour.routes.js';
import userRouter from './routes/user.routes.js';


const app = express();
app.use(express.json())

app.use("/api/v1/tours",tourRouter)
app.use("/api/v1/users",userRouter)
app.get("/home",(req,res)=>{
    res.status(200).json({message: "home"})

})
app.use('*',(req,res)=>{
    res.status(404).json({message: 'file does not exist'})    
})



export default app;
