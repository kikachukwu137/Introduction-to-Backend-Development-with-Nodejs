import express from 'express';
import fs from 'fs';
import morgon from 'morgan';
const app = express()
app.use(express.json())
app.use(morgon('dev'))

app.use((req,res,next)=>{
    req.time= new Date().toISOString()
    next();
})

//params middleware

 const checkID = (req,res,next,val) => {
    if(req.params.id * 1 > tourData.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next();
 }
const PORT = 5000;

//Converts a JavaScript Object Notation (JSON) string into an object. 
//we need it in form of an object so we can perform some operation on it.

const tourData = JSON.parse(fs.readFileSync('data/tour.data.json', 'utf-8'))

const getAllTour = (req,res)=>{

    res.status(200).json({
        status: 'success',
        time: req.time,
        result: tourData.length,
        data :{
            tourData
        }
    })

}
const  getTourById = (req,res)=>{
    const id = req.params.id * 1
    //this help to convert the string to number
    console.log(typeof(id))
    const tour = tourData.find(el => el.id === id)
    if(!tour){
       return  res.status(404).json({message: "file not found"})
    }
    
   
    res.status(200).json({
        status: 'success',
        data:{
            tour
        }
    })
}
const createTour = (req,res)=>{
    const newId = tourData[tourData.length - 1].id + 1;
    const newBody = req.body;
    const newInfo = Object.assign({id: newId},req.body)
    console.log(newInfo)

    tourData.push(newInfo)
    fs.writeFile('data/tour.data.json',JSON.stringify(tourData),(err)=>{
        if(err){
            return console.log(err)
        } res.status(201).json({
            status: 'success',
            data: {
                newInfo
            }
        })

      
    })
   

}
const updateTour = (req,res)=>{
    const id = req.params.id * 1
    //this help to convert the string to number
    console.log(typeof(id))
    const tour = tourData.find(el => el.id === id)
    if(!tour){
       return  res.status(404).json({message: "file not found"})
    }
    
   
    res.status(201).json({
        status: 'success',
        data:{
            tour
        }
    })

    
}
const deleteTour = (req,res)=>{
    const id = req.params.id * 1
    //this help to convert the string to number
    console.log(typeof(id))
    const tour = tourData.find(el => el.id === id)
    if(!tour){
       return  res.status(404).json({message: "file not found"})
    }
    
   
    res.status(204).json({
        status: 'success',
        data:null
            
        
    })}
// app.get('/api/v1/tour',getAllTour)
// app.get('/api/v1/tour/:id', getTourById)
// app.post('/api/v1/tour',createTour)
// app.patch('/api/v1/tour/:id', updateTour)
// app.delete('/api/v1/tour/:id',deleteTour)

app.route('/api/v1/tour').get(getAllTour).post(createTour)
app.route('/api/v1/tour/:id').get(getTourById).patch(updateTour).delete(deleteTour)
    

app.all('/',(req,res)=>{
    res.status(200).json({message: "welcome"})
})





app.listen(PORT,()=>{
    console.log(`server is running on http://:${PORT}`)
})






