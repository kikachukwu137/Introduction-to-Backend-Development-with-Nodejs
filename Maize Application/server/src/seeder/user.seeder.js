import {connect} from '../config/db.js';

export async function userSeeder() {

    const admin = {
        fullName : "nike adejumo",
        phone: "08137687885",
        email:"admin@app.com",
        password: "bu799834",
        homeAddress: "123 west london",
        role:"ADMIN"
        
    };
    const mongoDB = await connect(process.env.MONGO_URI)
    const userModel = mongoDB.connection.db.collection("users");
    if (await userModel.findOne({ email: admin.email })) {
        console.log("Admin already exists");
        return;
      }
    
      const createdAdmin = await userModel.insertOne(admin);
      console.log("Admin created successfully", createdAdmin);
    }
    





