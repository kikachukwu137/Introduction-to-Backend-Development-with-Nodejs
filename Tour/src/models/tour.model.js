import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: false,
        unique: true,
        required: [true, "Name field is required"]
    },
    duration:{
        type: Number,
        required: true
    },
    difficulty:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default : 5

    },
    rating:{
        type: Number,
        required: true
    }



})



const Tour = mongoose.model("Tour",tourSchema) 
 
export default Tour