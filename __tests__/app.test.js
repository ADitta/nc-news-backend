const db = require("../db/connection.js");
const app = require("../app");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/topics", () => {
  describe("GET", () => {
    test("Returns status code of 200 and an object with a key of topics and and array of objects as its value", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(res.body).hasOwnProperty("topics");
          res.body.topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
});
