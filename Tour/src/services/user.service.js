import User from "../models/user.model.js";



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
