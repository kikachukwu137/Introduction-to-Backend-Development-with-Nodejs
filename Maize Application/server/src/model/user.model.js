import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: false
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    require: true,
    trim: true
  },
  homeAddress: {
    type: String,
    required: true,
  },
  amountInvested: {
    type: Number,
    default: 0, 
  },
  equityIssued: {
    type: Number,
    default: 0, 
  },
  investmentType: {
    type: String,
    enum: ['Early stage', 'Seed', 'Pre-seed', 'Revenue split 12-Month'],
    required: true,
  },
  investmentDate: {
    type: Date,
    default: Date.now, 
  },
  role:{
    type: String,
    enum: ["USER","ADMIN"],
    default: "USER"
  }
},{
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
