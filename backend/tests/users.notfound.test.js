const request = require("supertest");
const sinon = require('sinon');
const middleware = require('../middleware/auth.js');
const mongoose = require('mongoose');
var app;

beforeAll(async () => {
  //Replace the middleware function with a fake function that passes the request through.
  sinon.stub(middleware, "userVerification")
  .callsFake(async function userVerification(req, res, next) {
      return next();
  });

  //You need to declare this after the fake function is made
  app = require("../app");
});

afterAll(async () => {
  //Restore middleware function to the original state
  middleware.userVerification.restore();
  mongoose.disconnect;
});

// test user stat change
describe("POST /users/changestats", () => {  
  it("it should return 404 for no user found", async () => {
    // request stat update
    const response = await request(app).post("/users/changestats");
    // check for error 404, user not found
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});

describe("GET /users/me", () => {
  it("it should get a user's stats", async () => {
    // request stats
    const response = await request(app).get("/users/me");
    // check for error 404, user not found
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});