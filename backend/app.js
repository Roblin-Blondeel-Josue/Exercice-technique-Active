require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to users list");
};

app.get("/", welcome);

const userHandlers = require("./userHandlers");

app.post("/register", userHandlers.postUser);
app.get("/users", userHandlers.getUsers);
app.get("/users/:id", userHandlers.getUserById);
app.put("/users/:id", userHandlers.updateUser);
app.delete("/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});
