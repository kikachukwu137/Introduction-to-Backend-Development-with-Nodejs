//this prevent the use of try and catch and makes our code more clean and easy to understand
/*
Breaking It Down
1️⃣ asyncCatch(fn) – A function that takes an async function (fn).
2️⃣ Returns a new function (req, res, next) => { ... } – This is what Express will call.
3️⃣ Executes fn(req, res, next) – Calls the original async function.
4️⃣ Handles errors with .catch(next) – If an error occurs, it gets passed to next(), which Express uses for error handling.  */

export const catchAsync = fn => {
    return (req,res,next) => fn(req,res,next).catch(next)
}