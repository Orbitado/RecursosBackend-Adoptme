import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Make sure server is running before tests (npm run dev)
const requester = supertest("http://localhost:8080");

// Connect to MongoDB
before(async function () {
  this.timeout(10000);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for adoption tests");
  } catch (error) {
    console.log(`Error connecting to DB: ${error.message}`);
  }
});

// Close DB connection after tests
after(async function () {
  await mongoose.disconnect();
  console.log("MongoDB connection closed");
});

describe("Pruebas router adoptions", function () {
  this.timeout(10000);

  // Three simple tests for adoptions
  it("GET /api/adoptions should return an array of adoptions", async () => {
    // Act: Get all adoptions
    let response = await requester.get("/api/adoptions");

    // Assert
    expect(response.statusCode).to.be.eq(200);
    expect(response.body).to.has.property("status").and.to.be.eq("success");
    expect(response.body).to.has.property("payload").and.to.be.an("array");
  });

  it("GET /api/adoptions/:aid with invalid ID should return 404", async () => {
    // Act: Get non-existent adoption
    const nonExistentAdoptionId = new mongoose.Types.ObjectId();
    let response = await requester.get(
      `/api/adoptions/${nonExistentAdoptionId}`
    );

    // Assert
    expect(response.statusCode).to.be.eq(404);
    expect(response.body).to.has.property("status").and.to.be.eq("error");
    expect(response.body)
      .to.has.property("error")
      .and.to.be.eq("Adoption not found");
  });

  it("POST /api/adoptions/:uid/:pid with invalid IDs should return 404", async () => {
    // Act: Try to adopt with invalid IDs
    const nonExistentUserId = new mongoose.Types.ObjectId();
    const nonExistentPetId = new mongoose.Types.ObjectId();
    let response = await requester.post(
      `/api/adoptions/${nonExistentUserId}/${nonExistentPetId}`
    );

    // Assert
    expect(response.statusCode).to.be.eq(404);
    expect(response.body).to.has.property("status");
    expect(response.body).to.has.property("error");
  });
});
