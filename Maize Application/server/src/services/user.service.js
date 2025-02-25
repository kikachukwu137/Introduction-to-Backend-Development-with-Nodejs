import User from '../model/user.model.js'
import { ErrorWithStatus } from '../exceptions/error-with-status.js';
export const getAllUsers = async(page=1, limit=10, query = null) =>{
    try {
        const skip = (page - 1) * limit;
        const filter = query ? {fullName:{$regex:query, $options: "i"}} : {} ;
        const users = await User.find(filter,{password: 0})
            .skip(skip)
            .limit(limit)
        const total = await User.countDocuments(filter)
        return {data: users,
            meta: {page,limit,total}
        }
        
    } catch (error) {
        throw new ErrorWithStatus(error.message,500)
        
    }
}

