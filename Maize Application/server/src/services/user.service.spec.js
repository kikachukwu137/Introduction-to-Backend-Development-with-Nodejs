import User from "../model/user.model.js";
import * as userService from "../services/user.service.js";

describe("Service: User Service", () => {
  // Run this method before each test
  beforeEach(() => {
    jest.clearAllMocks(); // ✅ Clears all mocks
    jest.resetAllMocks(); // ✅ Resets function implementations
  });

  it("should return all users", async () => {
    const mockUsers = [
      {
        fullName: "User 1",
        phone: "09123456789",
        email: "user@mail.com",
        password: "password",
        homeAddress: "12 Adeola street",
        amountInvest: 1000,
        equityIssued: 1,
        investmentType: "Seed",
        role: "USER",
      },
      {
        fullName: "User 2",
        phone: "09123456782",
        email: "user2@mail.com",
        password: "password",
        homeAddress: "11 Adeola street",
        amountInvest: 100,
        equityIssued: 12,
        investmentType: "Early stage",
        role: "USER",
      },
    ];

    // ✅ Fix: `find()` should return a promise
    User.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockUsers), // ✅ Use mockResolvedValue() for async functions
    });

    // ✅ Fix: `countDocuments()` should return a promise
    User.countDocuments = jest.fn().mockResolvedValue(mockUsers.length);

    // Call the service and assert the output
    const result = await userService.getAllUsers();

    expect(result.data).toEqual(mockUsers);
    expect(result.meta.total).toEqual(mockUsers.length);
    expect(User.find).toHaveBeenCalledTimes(1);
    expect(User.countDocuments).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when failed to get all users", async () => {
    // ✅ Fix: `find().limit()` should correctly reject the promise
    User.find = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockRejectedValue(new Error("Failed to get users")), // ✅ Ensures proper rejection
    });

    await expect(userService.getAllUsers()).rejects.toThrow("Failed to get users");
  });
});



// import User from '../model/user.model.js';
// import * as userService from '../services/user.service.js';


// describe("service: user service",()=>{

//     //run  this method
//     beforeEach(() => {
//         jest.resetAllMocks();
//       });

//       it("it should return all users",async()=>{
//         const mockUsers = [
//             { fullName: "User 1",
//             phone: "09123456789",
//              email: "user@mail.com",
//               password: "password",
//               homeAddress: "12 Adeola street",
//               amountInvest: 1000,
//               equityIssued: 1,
//               investmentType: "Seed",
//                role: "USER" },
//                { fullName: "User 2",
//                 phone: "09123456782",
//                  email: "user2@mail.com",
//                   password: "password",
//                   homeAddress: "11 Adeola street",
//                   amountInvest: 100,
//                   equityIssued: 12,
//                   investmentType: "Early stage",
//                    role: "USER" },
           
//           ];
//           User.find = jest.fn().mockReturnValue({
//             skip: jest.fn().mockReturnThis(),
//       limit: jest.fn().mockReturnValue(mockUsers)
      

//           })
//       User.countDocuments = jest.fn().mockReturnValue(mockUsers.length);

//       //calling the service and asserting the output;
//       const result = await userService.getAllUsers()
//       expect(result.data).toEqual(mockUsers);
// expect(result.meta.total).toEqual(mockUsers.length);
// expect(User.find).toHaveBeenCalledTimes(1);
// expect(User.countDocuments).toHaveBeenCalledTimes(1);

          
          

//       })
//       it("should throw an error when failed to get all user",async()=>{
//         User.find = jest.fn().mockReturnValue({
//             skip: jest.fn().mockReturnThis(),
//             limit: jest.fn().mockRejectedValue(new Error("Failed to get users")),
//           });
//           await expect(userService.getAllUsers()).rejects.toThrow("Failed to get users");


//       })
      


// })