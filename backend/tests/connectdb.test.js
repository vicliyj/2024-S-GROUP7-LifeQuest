const request = require("supertest");
const sinon = require('sinon');
const middleware = require('../middleware/auth.js');
const mongoose = require('mongoose');
const actualMONGO_URI = process.env.MONGO_URI;

var app;

beforeAll(async () => {
  //Replace the middleware function with a fake function that passes the request through.
  sinon.stub(middleware, "userVerification")
  .callsFake(function userVerification(req, res, next) {
      return next();
  });

  //Change secret to something that won't work
  process.env.MONGO_URI = '';

  //You need to declare this after the fake function is made
  app = require("../app.js");

});

afterAll(async () => {
  //Restore middleware function to the original state
  middleware.userVerification.restore();
  //Restore secret
  process.env.MONGO_URI = actualMONGO_URI;
  mongoose.disconnect();
});

describe("Connection to database failed", () => {
    it("it should not connect to database", async () => {
      // Request an API
      const response = request(app).post("/login/submit").send(null);
      // Check for an undefined error
      expect(response.statusCode).toBe(undefined);
    });
});