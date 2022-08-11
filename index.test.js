const request = require("supertest");
const { app } = require("./index");

jest.useFakeTimers();
jest.mock('uuid', () => {
  const base = '9134e286-6f71-427a-bf00-';
  let current = 100000000000;

  return {
    v4: () => {
      const uuid = base + current.toString();
      current++;

      return uuid;
    }
  }
});

describe("GET / ", () => {
  test("It should respond with string 'LOTTERY'", async () => {
    const response = await request(app).get("/");
    expect(response.body).toEqual("LOTTERY");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /newnumber", () => {
  test("It should respond with unique number of ticket", async () => {
    const response = await request(app).get("/newnumber");
    expect(response.body).toEqual("9134e286-6f71-427a-bf00-100000000000");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /allnumbers", () => {
  test("It should respond with list of all number", async () => {
    const response = await request(app).get("/allnumbers");
    const allnumbers = ["9134e286-6f71-427a-bf00-100000000000"]
    expect(response.body).toEqual(allnumbers);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /winner", () => {
  test("It should respond with list of all winners", async () => {
    const response = await request(app).get("/winner");
    const winner = []
    expect(response.body).toEqual(winner);
    expect(response.statusCode).toBe(200);
  });
});