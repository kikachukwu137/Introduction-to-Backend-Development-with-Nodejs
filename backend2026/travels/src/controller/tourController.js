import fs from 'fs';
const Tours = JSON.parse( fs.readFileSync('src/data/db.json', 'utf-8'))
export const getAllTours = (req,res) => { 
    res.status(200).json({
        status:"success",
        data: Tours
    })
}

export const createTour = (req,res) => {
    const body  = req.body;
    const newId = Tours[Tours.length - 1].id + 1
    if(!body || Object.keys(body).length === 0){
       return res.status(400).json({
            status: "fail",
            message : "No document"
        })
        }

    const newFile = Object.assign({id: newId}, body)
    // console.log(newFile)
    Tours.push(newFile)
    fs.writeFile('src/data/db.json',JSON.stringify(Tours), err =>{
        if(err){
            return res.status(500).json({status: "fail", message: err.message})
        }

    })
    res.status(201).json({
        status: "sucessful",
        data: Tours
    })
}

export const getTourById = (req,res) => {
    const id = req.params.id * 1
    const file = Tours.find(el => el.id === id)
    if(!file){
        return res.status(404).json({status: "fail", message: "file no found"})
    }
    res.status(200).json({status: "success", data: file})
}

export const updateTour = (req, res) => {
    const id = req.params.id * 1;
    const body = req.body;
    if(!id || Object.keys(body).length === 0){
       return  res.status(400).json({status: "fail", message: "no document"})
    }
    const checkFile = Tours.find(el => el.id === id)
    if(!checkFile){
       return  res.status(404).json({status: "fail", message: "no file found"})
    }
    Object.assign(checkFile, body)
    fs.writeFile("src/data/db.json", JSON.stringify(Tours), err => {
          if(err){
            return res.status(500).json({status: "fail", message: err.message})
        }

    })
    res.status(201).json({status: "success", data: checkFile})


}

export const deleteTour = (req, res) => {
       if (Number.isNaN(id)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid id"
        });
    }
    const id = req.params.id * 1;
    const index = Tours.findIndex(el => el.id === id)
    if(index === -1 ){
       return  res.status(404).json({status: "fail", message: "no file found"})
    }
    Tours.splice(index, 1)
    fs.writeFile("src/data/db.json", JSON.stringify(Tours), err => {
          if(err){
            return res.status(500).json({status: "fail", message: err.message})
        }

    })
    res.status(204).json({status: "success"})
}