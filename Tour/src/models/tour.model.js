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
    maxGroupSize:{
        type:Number,
        required:[true,"A tour must have a group size"]
    },
    difficulty:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default : 5

    },
    ratingsAverage:{
        type: Number,
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0

    },
    priceDiscount: Number,
    summary: {
        type: String, 
        trim: true,  //remove white space inthe beginning and the end of a string
        required: true
    },
    description:{
        type:String,
        trim:true
    },
    imageCover: {
        type: String,
        required: [true,"a tour must have image cover"]
    },
    images:[String],
    createdAt: {
        type: Date,
        default:Date.now()
    },
    startDates: [Date]



})



const Tour = mongoose.model("Tour",tourSchema) 
 
export default Tour