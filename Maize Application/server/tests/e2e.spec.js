//This test is an End-to-End (E2E) test for an authentication API using Jest and Supertest. The goal is to verify whether the authentication endpoints (register & login) work as expected.
import bcrypt from "bcrypt";
import request from "supertest";
import { connect } from "../src/config/db.js";
import app from "../src/index.js";

const TEST_DB = "mongodb://localhost:27017/alt_app_test";  
// // Use the default port for MongoDB

describe("E2E tests", () => {
  let mongodb;

  const clearDB = async () => {
    if (mongodb) {
      const collections = await mongodb.connection.db.collections();
      for (let collection of collections) {
        await collection.deleteMany();
      }
    }
  };

  beforeAll(async () => {
    jest.setTimeout(10000);  // Increase the timeout to 10 seconds
    try {


      mongodb = await connect(TEST_DB);
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      throw error;
    }
  });

  beforeEach(async () => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    if (mongodb) {
      await mongodb.connection.close();  
    }
  });

  it("should not be able to login", async () => {
    await clearDB();
    const res = await request(app).post("/auth/login").send({
      email: "test@yopmail.com",
      password: "password",
    });
    console.log(res.body);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("User not found");
  });

  it("should be able to register", async () => {
    await clearDB();
    const res = await request(app).post("/auth/register").send({
      email: "test@yopmail.com",
      password: "password",
      fullName: "Test User",
      phone: "09124657833",
      homeAddress: "12 Adeols street",
      amountInvested: 10,
      equityIssued:2,
      investmentType: "Pre-seed",
      role: "ADMIN",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("welcome");
    expect(res.body.data.user).toHaveProperty("_id");
    expect(res.body.data.user).toHaveProperty("fullName");
    expect(res.body.data.user).toHaveProperty("equityIssued");
    expect (res.body.data.investmentType).toEqual("Pre-seed")

    expect(res.body.data.user.FullName).toEqual("Test User");
    expect(res.body.data.user).toHaveProperty("email");
    expect(res.body.data.user.email).toEqual("test@yopmail.com");
  });

  it("should be able to login", async () => {
    await clearDB();
    mongodb.connection.db.collection("users").insertOne({
      email: "test@yopmail.com",
      password: await bcrypt.hash("password", 10),
      name: "Test User",
      role: "ADMIN",
    });

    const res = await request(app).post("/auth/login").send({
      email: "test@yopmail.com",
      password: "password",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Welcome");
    
    
  });

  it("should not be able to login - invalid payload", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@yopmail.com",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Email and password are required");
    
  });
});