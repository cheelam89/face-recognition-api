const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
  users: [
    {
      id: "123",
      name: "Abe",
      email: "abe@gmail.com",
      password: "sasa123",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Jack",
      email: "jack@gmail.com",
      password: "qwer123",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("Authentication Error");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let isFound = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      isFound = true;
      return res.json(user);
    }
  });
  if (!isFound) {
    res.status(400).json("user not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let isFound = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      isFound = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!isFound) {
    res.status(400).json("user not found");
  }
});

app.listen(3000, () => {
  console.log("Application is started at port 3000");
});
