/*import * as userService from "../service/user.service.js"; 

// Controller for user registration
const registerUser = async (req, res) => {
  try {
    // Extract data from request body
    const userData = req.body;

    // Call the Register service
    const newUser = await userService.Register(userData)

    // Respond with success and user data
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    // Handle errors and send appropriate response
    res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
};

// Controller for user login
 const loginUser = async (req, res) => {
  try {
    // Extract data from request body
    const { email, password } = req.body;

    // Call the login service
    const loginResponse = await userService.login(email, password);

    // Respond with success and login data
    res.status(200).json({
      message: loginResponse.message,
      user: loginResponse.user,
    });
  } catch (error) {
    // Handle errors and send appropriate response
    res.status(400).json({
      message: error.message || "Login failed",
    });
  }
};


export default {
  loginUser,
  registerUser
}



*/
// import * as userService from "../service/user.service.js";

// import {Register, Login} from '../service/user.service.js'

// // Controller for user registration
// const registerUser = async (req, res) => {
//   try {
//     const userData = req.body;
//     //const newUser = await userService.Register(userData);
//     const newUser = await Register(userData)
//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message || "Registration failed",
//     });
//   }
// };

// // Controller for user login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const loginResponse = await Login(email, password);
//     res.status(200).json({
//       message: loginResponse.message,
//       user: loginResponse.user,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message || "Login failed",
//     });
//   }
// };

// export default {
//   loginUser,
//   registerUser,
// };

import * as authService from '../services/auth.service.js';

// Controller for user registration
export const registerUser = async (req, res) => {
  try {
    const userData = req.body;

    // Call the Register service
    const newUser = await authService.Register(userData)

    // Respond with success
    res.status(201).json({
      message: "User registered successfully",
      data : {
        user: newUser
      }
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error in registerUser:", error);

    // Respond with error
    res.status(500).json({
      message: error.message || "Registration failed",
    });
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call the Login service
    const loginResponse = await authService.Login(email,password)

    // Respond with success
    res.status(200).json({
      message: loginResponse.message,
      user: loginResponse.user,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error in loginUser:", error);

    // Respond with error
    res.status(500).json({
      message: error.message || "Login failed",
    });
  }
};
