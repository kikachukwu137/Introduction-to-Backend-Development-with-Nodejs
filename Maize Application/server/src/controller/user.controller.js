// import * as userService from "../services/user.service.js"

// export const getAllUsers = async(req,res) =>{
//     try {
//         let page = Number(req.query.page) || 1
//         page = page < 1 ? 1 : page
//         let limit = Number(req.query.limit) || 10
//         limit = limit < 1 ? 10: limit 
//         const query = req.query.q
//         const {data, meta} = await userService.getAllUsers(page,limit,query)
//         res.json({message: "Get all users",data,meta})

//     } catch (error) {
//         res.status(500).json({message: error.message})
        
//     }
// }
import { getAllUsers as getAllUsersService } from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, query = null } = req.query; // Get pagination and query params
    const users = await getAllUsersService(Number(page), Number(limit), query);
    
    res.status(200).json(users); // Send JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
