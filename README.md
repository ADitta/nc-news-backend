# **NorthCoders News API**

# **Built By Asim Ditta**

---

## **Back-End**

- Back-end - Github link: https://github.com/ADitta/nc-news-backend

## **Front-End**

- Front-End - Hosted link: https://asim-ditta-nc-news.netlify.app/
- Front-End - Github link: https://github.com/ADitta/nc-news

---

## **Description**

This is an API built using Node.js, Express.js and PSQL.

The endpoints are available to view in the "endpoints.json" file or on the hosted link: https://asim-news-forum.herokuapp.com/api/

---

# **Setup / Installation Instructions**

### **requirements:**

- Node.js 17.x
- Postgres 14.x

### **Cloning the repositry:**

- In your teminal:

```
$ git clone https://github.com/ADitta/nc-news-backend
```

### **Installing dependencies:**

- Initialising Node by installing the required dependencies from `package.json`. In your teminal:

```
$ npm install
```

### **Environment setup:**

- You will need to create _two_ `.env` files for the app: `.env.test` and `.env.development`. add `PGDATABASE=<database_name_here>` into both of these, with the correct database name for both dev and test environments.

### **Database set-up and seeding:**

- To begin testing or using this app, you will need to setup the database seed it with data:

```
$ npm run setup-dbs
$ npm run seed
```

# **Testing**

- `Jest` is the framework used to test this application.
- To run tests:

```
$ npm test
```
