import User from '../models/user.model.js'
import ErrorWithStatus from '../exception/errorWithStatus.js';
import sendEmail from '../utils/email.js';
import crypto from 'crypto'
import { catchAsync } from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken'


const token = jwt.sign({},process.env.JWT_SECRET,)

export const signup = catchAsync(async(req,res,next)=>{
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    comfirmedPassword: req.body.comfirmedPassword

  })
  
})































/*
export const  forgotPassword = async (req, res, next) => {
  try
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorWithStatus('There is no user with email address.', 404));
    }
  
    // 2) Generate the random reset token
    const resetToken = user.createPasswordNewToken();
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
  
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        new ErrorWithStatus('There was an error sending the email. Try again later!'),
        500
      );
    }
}*/
export const forgotPassword = async (req, res, next) => {
  try {
      // 1) Get user based on POSTed email
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
          return next(new ErrorWithStatus('No user with that email found.', 404));
      }

      // 2) Generate the reset token
      const resetToken = user.createPasswordNewToken();
      await user.save({ validateBeforeSave: false });

      // 3) Construct the reset URL
      const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

      const message = `Forgot your password? Click here: ${resetURL}.\nIf you didn't request this, ignore this email.`;

      console.log("✅ Reset Token Generated:", resetToken);
      console.log("📩 Sending email to:", user.email);

      // 4) Send Email
      await sendEmail({
          email: user.email,
          subject: 'Your password reset token (valid for 10 min)',
          message
      });

      console.log("✅ Email sent successfully!");

      res.status(200).json({
          status: 'success',
          message: 'Token sent to email!',
      });

  } catch (err) {
      console.error("❌ Forgot Password Error:", err.message);
      return next(new ErrorWithStatus('There was an error sending the email. Try again later!', 500));
  }
};

  

export const resetPassword = async(req,res,next) => {
  //1 get user based on the token stored in the database
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: {$gt: Date.now()}
    })
//2 check if token have expire abd there is a  user
if(!user){
  return next(new ErrorWithStatus('token have expired', 400))
}
user.password = req.body.password;
user.passwordConfirm = req.body.passwordConfirm
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined;
await user.save()

// update the changePasswordAt property of the user


//log the user in and sent jwt


}