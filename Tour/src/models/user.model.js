import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'name field is a must']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate:[validator.isEmail, 'please provide a valid email']
    },
    photo: String,
    role:{
        type: String,
        enum:['user','admin', 'guide','lead-guide'],
        default:'user'
    },
    password:{
        type: String,
        minlength: 8,
        required:[true,'please provide a password'],
        select: false
    },
    confirmedPassword: {
        type:String,
        required: [true],
        validate: {
            validator: function(val){
                return val === this.password
            }
        }
    },
    passwordChangedAt: Date

})

//document middleware
userSchema.pre('save',async function(next){
    //only run this function if password was actually modified
    if(!this.isModified('password')) return next()
        //hash the password with cost 12
        this.password = await bcrypt.hash(this.password,12)
        //delete the confirmedPassword field
        this.confirmedPassword = undefined;
        next()
    
})
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await  bcrypt.compare(candidatePassword, userPassword)

}
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        //convert passwordChangedAT to a UNIX timestamp(in seconds)
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        //if jwt was issued before password was changed, return true
        return JWTTimestamp < changedTimeStamp;

    }
    //if passwordChangedAt doesnt exist, the user never changed the password
    return false
}

const User = mongoose.model('User',userSchema)


export default User