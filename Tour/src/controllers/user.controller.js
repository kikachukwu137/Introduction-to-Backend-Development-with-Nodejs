import * as userService from '../services/user.service.js'


export const signup = async(req,res)=> {
    try {
        
        const userData = await userService.signup(req.body)
        res.status(201).json(userData)
        
    } catch (error) {
        res.status(error.status).json({
            status: "failed",
            message: error.message
        })
        
    }
}

export const getAllUser = async(req,res)=>{
    try {
        const usersData = await userService.getAllUser() 
        res.status(201).json(usersData)


    } catch (error) {
        res.status(error.status).json({
            status: "failed",
            message: error.message
        })
        
    }
}

export const login = async(req,res) =>{
    try {
        const {email,password} = req.body
        const user = await userService.login(email,password)
        res.status(201).json({
          data: user  
        })
    } catch (error) {
        res.status(error.status).json({
            status: "failed",
            message: error.message
        })

        
    }
}