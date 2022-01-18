const db = require("../db/connection");
const {
  formatTopics,
  formatUsers,
  formatArticles,
  formatComments,
} = require("../utils/seed-formatting");

afterAll(() => db.end());

describe("formatTopics", () => {
  test("Returns an array from the function", () => {
    const topics = [
      { slug: "Asim", description: "Hi, hello there, this is a description" },
      { slug: "Jeep", description: "Another description right here" },
    ];
    expect(Array.isArray(formatTopics(topics))).toEqual(true);
  });

  test("Takes an array of objects and returns the value of each key in each object as an array", () => {
    const topics = [
      { slug: "Asim", description: "Hi, hello there, this is a description" },
      { slug: "Jeep", description: "Another description right here" },
    ];
    expect(formatTopics(topics)).toEqual([
      ["Asim", "Hi, hello there, this is a description"],
      ["Jeep", "Another description right here"],
    ]);
  });

  test("when run, the formatTopics function should not mutate array", () => {
    const topics = [
      { slug: "Asim", description: "Hi, hello there, this is a description" },
      { slug: "Jeep", description: "Another description right here" },
    ];
    formatTopics(topics);
    expect(topics).toEqual([
      { slug: "Asim", description: "Hi, hello there, this is a description" },
      { slug: "Jeep", description: "Another description right here" },
    ]);
  });
});

describe("formatUsers", () => {
  test("Returns an array from the function", () => {
    const users = [
      {
        username: "Asim_Ditta",
        name: "Asim",
        avatar_url: "https://thisisaurl.com/2348545",
      },
      {
        username: "Jeep_Ditta",
        name: "Jeep",
        avatar_url: "https://thisisaurl.com/2454568545",
      },
    ];
    expect(Array.isArray(formatUsers(users))).toEqual(true);
  });

  test("Takes an array of objects and returns the value of each key in each object as an array", () => {
    const users = [
      {
        username: "Asim_Ditta",
        name: "Asim",
        avatar_url: "https://thisisaurl.com/2348545",
      },
      {
        username: "Jeep_Ditta",
        name: "Jeep",
        avatar_url: "https://thisisaurl.com/2454568545",
      },
    ];
    expect(formatUsers(users)).toEqual([
      ["Asim_Ditta", "https://thisisaurl.com/2348545", "Asim"],
      ["Jeep_Ditta", "https://thisisaurl.com/2454568545", "Jeep"],
    ]);
  });

  test("when run, the formatTopics function should not mutate array", () => {
    const users = [
      {
        username: "Asim_Ditta",
        name: "Asim",
        avatar_url: "https://thisisaurl.com/2348545",
      },
      {
        username: "Jeep_Ditta",
        name: "Jeep",
        avatar_url: "https://thisisaurl.com/2454568545",
      },
    ];
    formatUsers(users);
    expect(users).toEqual([
      {
        username: "Asim_Ditta",
        name: "Asim",
        avatar_url: "https://thisisaurl.com/2348545",
      },
      {
        username: "Jeep_Ditta",
        name: "Jeep",
        avatar_url: "https://thisisaurl.com/2454568545",
      },
    ]);
  });
});

describe("formatArticles", () => {
  test("Returns an array from the function", () => {
    const articles = [
      {
        title: "Title 1",
        topic: "mitch",
        author: "maasi",
        body: "This is a body",
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
        votes: 100,
      },
      {
        title: "Title 2",
        topic: "ditch",
        author: "saasi",
        body: "This is another body",
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
        votes: 1000,
      },
    ];
    expect(Array.isArray(formatArticles(articles))).toEqual(true);
  });

  test("Takes an array of objects and returns the value of each key in each object as an array", () => {
    const articles = [
      {
        title: "Title 1",
        topic: "mitch",
        author: "maasi",
        body: "This is a body",
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
        votes: 100,
      },
      {
        title: "Title 2",
        topic: "ditch",
        author: "saasi",
        body: "This is another body",
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
        votes: 1000,
      },
    ];
    expect(formatArticles(articles)).toEqual([
      [
        "Title 1",
        "This is a body",
        100,
        "mitch",
        "maasi",
        `Thu Jul 09 2020 22:11:00 GMT+0100`,
      ],
      [
        "Title 2",
        "This is another body",
        1000,
        "ditch",
        "saasi",
        `Thu Jul 09 2020 22:11:00 GMT+0100`,
      ],
    ]);
  });

  test("when run, the formatTopics function should not mutate array", () => {
    const articles = [
      {
        title: "Title 1",
        topic: "mitch",
        author: "maasi",
        body: "This is a body",
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
        votes: 100,
      },
      {
        title: "Title 2",
        topic: "ditch",
        author: "saasi",
        body: "This is another body",
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
        votes: 1000,
      },
    ];
    formatArticles(articles);
    expect(articles).toEqual([
      {
        title: "Title 1",
        topic: "mitch",
        author: "maasi",
        body: "This is a body",
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
        votes: 100,
      },
      {
        title: "Title 2",
        topic: "ditch",
        author: "saasi",
        body: "This is another body",
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
        votes: 1000,
      },
    ]);
  });
});

describe("formatComments", () => {
  test("Returns an array from the function", () => {
    const comments = [
      {
        body: "body 1",
        votes: 16,
        author: "Maasi",
        article_id: 10,
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
      },
      {
        body: "body 2",
        votes: 20,
        author: "Saasi",
        article_id: 10,
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
      },
    ];
    expect(Array.isArray(formatComments(comments))).toEqual(true);
  });

  test("Takes an array of objects and returns the value of each key in each object as an array", () => {
    const comments = [
      {
        body: "body 1",
        votes: 16,
        author: "Maasi",
        article_id: 10,
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
      },
      {
        body: "body 2",
        votes: 20,
        author: "Saasi",
        article_id: 10,
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
      },
    ];
    expect(formatComments(comments)).toEqual([
      ["Maasi", 10, 16, "Thu Jul 09 2020 22:11:00 GMT+0100", "body 1"],
      ["Saasi", 10, 20, "Thu Jul 09 2020 22:11:00 GMT+0100", "body 2"],
    ]);
  });

  test("when run, the formatTopics function should not mutate array", () => {
    const comments = [
      {
        body: "body 1",
        votes: 16,
        author: "Maasi",
        article_id: 10,
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
      },
      {
        body: "body 2",
        votes: 20,
        author: "Saasi",
        article_id: 10,
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
      },
    ];
    formatComments(comments);
    expect(comments).toEqual([
      {
        body: "body 1",
        votes: 16,
        author: "Maasi",
        article_id: 10,
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
      },
      {
        body: "body 2",
        votes: 20,
        author: "Saasi",
        article_id: 10,
        created_at: "Thu Jul 09 2020 22:11:00 GMT+0100",
      },
    ]);
  });
});
