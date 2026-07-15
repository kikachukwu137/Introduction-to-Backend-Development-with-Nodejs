const express = require('express')
const fs = require('fs');
const { join } = require('path');
const App = express()
App.use(express.json())
const PORT = 4001;

const record = JSON.parse(fs.readFileSync('./data/db.txt', 'utf-8'))
console.log(record)

App.get("/",(req,res)=>{
    
    res.status(200).json({

        status: "success",
        data: record
    })
})
App.get("/:id",(req,res)=>{
    const fileId = req.params.id * 1
    const file = record.find(el => el.id === fileId)
    if(!file){
        return res.status(404).json({status: "fail", message : "file not found"})
    }
    res.status(200).json({
        status: "success",
        data: record
    })
})
App.post('/', (req, res) =>{
    const id = record[record.length - 1].id + 1
    // console.log(id)
    const newFile = req.body;
    if(!newFile || Object.keys(newFile).length === 0){
        return res.status(400).json({status: "fail", message: "no data"})
    }
    const file = Object.assign({id : id} ,newFile)
    record.push(file)
    fs.writeFile('./data/db.txt', JSON.stringify(record), err => {
        if(err){
            return err.message
        }
        res.status(201).json({status:"success", data: newFile})

    })
    

})

App.patch("/:id",(req,res) =>{
    const  id = req.params.id * 1;
    const newFile = req.body;
    if(!id || Object.keys(newFile).length === 0){
        return res.status(400).json({
            status: 'fail',
            message: "cant update"
        })
    }
    const file = record.find(el => el.id === id)
    if(!file){
        return res.status(404).json({
            status: 'fail',
            message: " file not found"
        })
    }
    Object.assign(file, newFile )
    
    fs.writeFile('./data/db.txt',JSON.stringify(record),err => {
        if(err){
            return console.log(err.message)
        }
        res.status(201). json({
            status: "success",
            data: file
        })
    })
}) 

App.delete("/:id",(req,res)=> {
    const id = req.params.id * 1
    // if(!id){
    //     return res.status(400).json({status:"fail",message: "no id"})
    // }
     if (Number.isNaN(id)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid id"
        });
    }
    const index = record.findIndex(item => item.id === id)
    if(index === -1){
        return res.status(404).json({status:"fail", message:"file not found"})
    }
    record.splice(index,1)
    fs.writeFile("./data/db.txt",JSON.stringify(record), err => {
        if(err){
            return res.status(500).json({status:"error", message: err.message})
        }
        res.status(204)

    })
})

/*App.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid id"
        });
    }

    const index = record.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Record not found"
        });
    }

    record.splice(index, 1);

    fs.writeFile("./data/db.txt", JSON.stringify(record), err => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: err.message
            });
        }

        res.sendStatus(204);
    });
});
*/
App.listen(PORT,()=>{
    console.log('server is listen on http://localhost:4001')
})
