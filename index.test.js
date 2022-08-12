const request = require("supertest");
const App = require("./index");

jest.useFakeTimers()
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
    const response = await request(App.app).get("/");
    expect(response.body).toEqual("LOTTERY");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /newnumber", () => {
  test("It should respond with unique number of ticket", async () => {
    const response = await request(App.app).get("/newnumber");
    expect(response.body).toEqual({"ticket": "9134e286-6f71-427a-bf00-100000000000", "user": "127.0.0.1"});
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /newnumber", () => {
  test("It should respond with 'User already have a number'", async () => {
    const response = await request(App.app).get("/newnumber");
    expect(response.body).toEqual('User already have a number');
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /allnumbers", () => {
  test("It should respond with list of all number", async () => {
    const response = await request(App.app).get("/allnumbers");
    const allnumbers = [{"ticket": "9134e286-6f71-427a-bf00-100000000000", "user": "127.0.0.1"}]
    expect(response.body).toEqual(allnumbers);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /winner", () => {
  test("It should respond with list of all winners", async () => {
    const response = await request(App.app).get("/winner");
    const winner = []
    expect(response.body).toEqual(winner);
    expect(response.statusCode).toBe(200);
  });
});

describe("findWinner", () => {
  test("It should respond with string 'LOTTERY'", async () => {
    const b = jest.spyOn(App, 'findWinner') 
    App.findWinner()
    expect(b).toBeCalled();
  });


  test("It should respond with string 'LOTTERY'", async () => {
    const b = jest.spyOn(App, 'findWinner') 
    App.lotteryNumbers.length = 0
    App.findWinner()
    expect(b).toBeCalled();
  });
});