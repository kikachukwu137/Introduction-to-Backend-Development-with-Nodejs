import express from 'express';

import tourRouter from './routes/tour.routes.js';


const app = express();
app.use(express.json())

app.use("/api/v1/tours",tourRouter)
app.get("/home",(req,res)=>{
    res.status(200).json({message: "home"})

})
app.use('*',(req,res)=>{
    res.status(404).json({message: "file dont found"})
})





export default app;
