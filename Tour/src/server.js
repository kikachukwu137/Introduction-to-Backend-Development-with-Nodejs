import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config()

import connect from "./db.js";

const MONGO_URL = process.env.MONGO_URL;
if(!MONGO_URL){
    throw new Error("to url to connect to database")
}
const PORT = process.env.PORT
connect(MONGO_URL).then(()=> {
    app.listen(PORT,()=>{
        
        console.log('database is connected')
        console.log(`server is running on http://localhost:${PORT}`)


    })
})
 



.catch(err=>{
    console.log(err.message)
})