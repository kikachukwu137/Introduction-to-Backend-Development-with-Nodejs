import User from "../models/user.model.js";
import ErrorWithStatus from "../exception/errorWithStatus.js";



export const getAllUser = async() => {
    try {
        const users = await User.find()
        return {
            status: 'success',
            data : users
        }
        
    } catch (error) {
        throw new ErrorWithStatus(error.message,error.statusCode || 500)
        
    }
}
export const filterUserField = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el)) newObj[el] = obj[el]
    // add allowed field to newObj        
    })
    return newObj;
}


export const updateUserService = async(userId,updateData) => {
    return  await User.findByIdAndUpdate(userId,updateData,{new:true,
        runValidators: true
    })
}
// Soft delete (deactivate) a user account
export const deleteUserService = async (userId) => {
    return await User.findByIdAndUpdate(userId, { active: false });
  };