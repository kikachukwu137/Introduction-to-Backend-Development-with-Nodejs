import validator from 'validator';
//import User from './user.model.js'
import mongoose from 'mongoose';
import slugify from 'slugify';
const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: false,
        unique: true,
        required: [true, "Name field is required"],
        maxlength:[40,"A tour name must not be more than 40 character"],
        minlength:[10,"A tour name must have at less 10 character"],
        // validate: [validator.isAlpha,'Tour name must only contain characters']

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
        required: true,
        enum:{values:['easy','medium','difficult'],
            message:'Difficulty is either: easy,medium,difficult'
        }
    },
    price:{
        type: Number,
        default : 5

    },
    ratingsAverage:{
        type: Number,
        default: 4.5,
        min:[1,'mininum rating must be 1'],
        max:[5, 'max rating must not excess 5']
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    

    },
    priceDiscount: {
        type:Number,
        validate: {
            validator: function (val){
                return val < this.price;


            },
            message: 'discount price ({VALUE})should be less than regular price'

        }
        
    },
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
        // required: [true,"a tour must have image cover"]
    },
    slug: String,
    images:[String],
    createdAt: {
        type: Date,
        default:Date.now()
        //select: false  this will hide
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false,
        // select: false
    },
    //embedded object

    startLocation:{
        //geospatial  we need the 

        //Geojson
        type:{
            type: String,
            default: 'Point',
            enum:['Point']

        },
        coordinates: [Number],
        address:String,
        description: String
    },locations: [{

        //Geojson// creation of embedded document
        type:{
            type: String,
            default: 'Point',
            enum:['Point']

        },
        coordinates: [Number],
        address:String,
        description: String,
        day: Number
    }
    ],
    guides: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]



},{ toJSON: {virtuals: true},
toObject: {virtuals:true}})
//virtue prop
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7
})
//Virtual populate
tourSchema.virtual('reviews',{ //name of the virtual property is reviews and 
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
})

//document middleware runs before .save() and .create()
tourSchema.pre('save',function(next){
    this.slug = slugify(this.name,{lower: true})
    next( )
})

//this is for embedding
// tourSchema.pre('save',async function(next){
//     const guides = this.guides.map(async id => await User.findById(id))
//     this.guides = await Promise.all(guides)
//     next()
// })
// tourSchema.post('save',function(doc,next){

// })

//query middleware
tourSchema.pre(/^find/, function(next){


// tourSchema.pre('find', function(next){
    this.find({secretTour: {$ne: true}})
    this.start = Date.now();

    next()
})
tourSchema.pre(/^find/,function(next){
    this.populate({
        path: 'guides',
        select: '-__V -passwordChangeAt'
    })


    next()
})

tourSchema.post(/^find/,function(docs,next){
    console.log(`Query took ${Date.now() - this.start} milliseconds!`)
    next()
})

///aggrevation middleware
tourSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{secretTour: {$ne: true}}})

    next()

})
const Tour = mongoose.model("Tour",tourSchema) 
 
export default Tour