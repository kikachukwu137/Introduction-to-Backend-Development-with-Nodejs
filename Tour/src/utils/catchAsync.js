//this prevent the use of try and catch and makes our code more clean and easy to understand
export const catchAsync = fn =>{
    return (req,res,next) => fn(req,res,next).catch(next)
}