/*import * as userService from '../services/user.service.js'


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
}*/

// export const forgetPassword = async (req, res, next) => {
//     try {
//         const { email } = req.body;
//         const result = await userService.forgetPasswordService(email);

//         res.status(200).json({
//             status: 'success',
//             message: 'Password reset token sent!',
//             resetURL: result.resetURL, // ⚠ Only for testing. Remove in production.
//         });
//     } catch (error) {
//         next(error); // Passes the error to the global error handler
//     }
// };
/*export const resetPassword = async(req,res)=>{}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const { resetURL } = await userService.forgotPasswordService(email, req.protocol, req.get('host'));

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
            resetURL, // ⚠️ Remove in production
        });
    } catch (error) {
        res.status(error.status || 500).json({
            status: 'error',
            message: error.message || 'Something went wrong!',
        });
    }
};
*/