import * as userService from '../services/user.service.js'
 import { catchAsync } from '../utils/catchAsync.js'
 import ErrorWithStatus from '../exception/errorWithStatus.js'
import { updateTourController } from './tour.controller.js'

// const catchAsync = fn => {
//     return (req,res,next)=>{fn(req,res,next).catch(next)}
// }




export const getAllUser = catchAsync(async(req,res,next)=>{
   
        const usersData = await userService.getAllUser() 
        res.status(201).json({
            status: "success",
            result: usersData.length,
            data: {usersData}
        })


    } )

export const updateMe  = catchAsync(async(req,res,next)=>{
    if(req.body.password || req.body.confirmedPassword){
        return next (new ErrorWithStatus("This routes is not for password update",400))
    }
    // Filter only allowed fields (name, email)
    const filteredBody = userService.filterUserField(req.body,"name","email")
    const updateUser = await userService.updateUserService(req.user.id,filteredBody)
    res.status(200).json({
        status: "success",
        data: { user: updateUser },
      });
})
// Soft delete the logged-in user
export const deleteMe = catchAsync(async (req, res, next) => {
    await userService.deleteUserService(req.user.id);
    res.status(204).json({ status: "success", data: null });
  });