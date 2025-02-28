import User from "../models/user.model.js";
import ErrorWithStatus from "../exception/errorWithStatus.js";
import jwt from 'jsonwebtoken';
import sendEmail from "../utils/email.js";

function generateToken(id){
    const token = jwt.sign({id},process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
    return token
}

export const signup = async(inputData) => {
    try {
        const {name,email,photo,password,confirmedPassword} = inputData;
        //let validate the inputed Data

        if(!name || !email || !password || !confirmedPassword){
            throw new ErrorWithStatus("All fields are required",400)
        }
        const existingUser = await User.findOne({email:inputData.email})
        if(existingUser){
            throw new ErrorWithStatus("User already exist",400)
        }

        
        const user = await User.create(inputData)
        const token = generateToken(user._id)
        return{
            status: "success",
            token: token,
            message: "User registered successfully",
            user
        }

    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)
        
    }
}
// export const resetPasswordservice = async()=>{}
// export const forgotPasswordService = async (email, reqProtocol, reqHost) => {
//     // 1) Get user based on POSTed email
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new ErrorWithStatus('There is no user with this email address.', 404);

    

//     // 2) Generate the random reset token
//     const resetToken = user.createPasswordResetToken()

//     await user.save({ validateBeforeSave: false });

//     // 3) Create reset URL
//     const resetURL = `${reqProtocol}://${reqHost}/api/v1/users/resetPassword/${resetToken}`;

//     // 4) Email message
//     const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

//     try {
//         await sendEmail({
//             email: user.email,
//             subject: 'Your password reset token (valid for 10 min)',
//             message,
//         });

//         return { resetURL };
//     } catch (err) {
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;
//         await user.save({ validateBeforeSave: false });

//         throw new ErrorWithStatus('There was an error sending the email. Try again later!', 500);
//     }
// };






export const login= async(userEmail,password) => {
    try {
        if(!userEmail || !password){
            throw new ErrorWithStatus("these fields are required",400)
        }
        // check email
        const user = await User.findOne({email: userEmail }).select('+password')
        
        
        if(!user || !await user.correctPassword(password,user.password)){

            throw new ErrorWithStatus("inValid emall and password",400)
        }
        return ({
            message: "successful!",
            date: generateToken(user._id)
        })
        
        


    } catch (error) {
        throw new ErrorWithStatus(error.message,error.status || 500)
    }
}
export const getAllUser = async() => {
    try {
        const users = await User.find()
        return {
            status: 'success',
            data : users
        }
        
    } catch (error) {
        throw new ErrorWithStatus(error.message,error.status || 500)
        
    }
}