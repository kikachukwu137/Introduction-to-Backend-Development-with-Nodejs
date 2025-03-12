import { fileURLToPath } from "url";
import Tour from '../models/tour.model.js';
import connect from '../db.js'
import dotenv from 'dotenv';
import fs from 'fs';
import path from "path";
dotenv.config()
const MONGO_URL = process.env.MONGO_URL;
connect(MONGO_URL).then(()=> {
    
        console.log('database is connected')
    
    })

 .catch(err=>{
    console.log(err.message)
})
//read file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tours = JSON.parse(fs.readFileSync(path.join(__dirname, "../dev_data/tours.json"), "utf-8"));

//import data into DB

const importData = async() => {                                                                                                                         
    try {
        await Tour.create(tours)
        console.log('successful')
        process.exit()
        
        
    } catch (error) {

        console.log(error)
        process.exit(1)


        
        
    }
}

const deleteData = async() => {
    try {
        await Tour.deleteMany();
        console.log('file deleted')
        process.exit()
        
    } catch (error) {
        console.log(err)
        process.exit(1)

    }
}
if (process.argv[2] === '--import'){
    importData()
}else if(process.argv[2] === '--delete'){
    deleteData()
}
 console.log(process.argv)


