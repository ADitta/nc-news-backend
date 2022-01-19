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
          if (res.body.length !== 0) {
            res.body.topics.forEach((topic) => {
              expect(topic).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String),
              });
            });
          } else {
            fail("Error, body is empty");
          }
        });
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test("Returns status code of 200 and an object with a key of articles and and array of objects as its value", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
          expect(typeof res.body).toBe("object");
          expect(res.body.article).toMatchObject({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            author: "butter_bridge",
            created_at: "2020-07-09T20:11:00.000Z",
            comment_count: "11",
          });
        });
    });

    test("Returns status code of 404 with error message when provided non existent articleId", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Returns status code of 400 with error message when provided incorrect articleId", () => {
      return request(app)
        .get("/api/articles/apple")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
  describe("PATCH", () => {
    test("Return status code 201, increment votes by 10 and return object", () => {
      const increaseVotes = { inc_votes: 10 };
      return request(app)
        .patch("/api/articles/1")
        .send(increaseVotes)
        .expect(201)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          expect(body.result).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 110,
            author: "butter_bridge",
            topic: "mitch",
            created_at: "2020-07-09T20:11:00.000Z",
          });
        });
    });

    test("Return status code 201, increment votes by 10 and return object", () => {
      const decreaseVotes = { inc_votes: -10 };
      return request(app)
        .patch("/api/articles/1")
        .send(decreaseVotes)
        .expect(201)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          expect(body.result).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 90,
            author: "butter_bridge",
            topic: "mitch",
            created_at: "2020-07-09T20:11:00.000Z",
          });
        });
    });

    test("Returns status code of 404 with error message when provided non existent articleId", () => {
      const decreaseVotes = { inc_votes: -10 };
      return request(app)
        .patch("/api/articles/9999")
        .send(decreaseVotes)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Returns status code of 400 with error message when provided incorrect articleId", () => {
      const decreaseVotes = { inc_votes: -10 };
      return request(app)
        .patch("/api/articles/apple")
        .send(decreaseVotes)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
});

describe("/api/articles", () => {
  describe("GET", () => {
    test("Returns status code of 200 and an array of objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          {
            expect(typeof body).toBe("object");
            body.articles.forEach((article) => {
              expect(article).toMatchObject({
                article_id: expect.any(Number),
                title: expect.any(String),
                body: expect.any(String),
                votes: expect.any(Number),
                author: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                comment_count: expect.any(String),
              });
            });
          }
        });
    });

    test("Return status code 200 and should be sorted by date as default", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });

    test("Return status code 200 and should be sorted by article_id as default", () => {
      return request(app)
        .get("/api/articles/?sort_by=article_id")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("article_id", {
            descending: true,
          });
        });
    });

    test("Return status code 200 and should be sorted in the default descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSorted({ descending: true });
        });
    });

    test("Return status code 200 and should be sorted in ascending order", () => {
      return request(app)
        .get("/api/articles?order_by=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSorted({ ascending: true });
        });
    });

    test("Return status code 400 when provided incorrect order_by url", () => {
      return request(app)
        .get("/api/articles?order_by=ASCFGD")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });

    test("Return status code 400 when provided incorrect sort_by url", () => {
      return request(app)
        .get("/api/articles?sort_by=randomColummName")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
});
