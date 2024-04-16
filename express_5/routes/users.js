const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const users = [
  {
    id: "1",
    name: "John",
    surname: "Smith",
    age: 24,
  },
  {
    id: "2",
    name: "Anna",
    surname: "Newton",
    age: 22,
  },
];

router.get("/", (req, res) => {
  res.send(users);
});

// router.post("/", (req, res) => {
//   const new_user = req.body;
//   users.push(new_user);
//   res.send(users);
// });

// Fetch user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);
  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }
  res.send(user);
});

// Add new user
router.post("/", (req, res) => {
  const { name, surname, age } = req.body;
  if (!name || !surname || !age) {
    return res.status(400).send({ message: "Missing data to create new user." });
  }
  const id = uuidv4();
  const new_user = { id, name, surname, age };
  users.push(new_user);

  res.send({ message: "User added!", new_user });
});

// Modify existing user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === id);
  if (!userIndex) {
    return res.status(400).send({ message: "Missing user id." });
  }

  const { name, surname, age } = req.body;
  if (!name || !surname || !age) {
    return res.status(400).send({ message: "Missing data to modify the user." });
  }

  users[userIndex] = { ...users[userIndex], name, surname, age };
  res.send({ message: "Modified user", user: users[userIndex] });
});

// Update user's age
router.put("/:id/age", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === id);
  if (!userIndex) {
    return res.status(400).send({ message: "Missing user id." });
  }

  const { age } = req.body;
  if (!age) {
    return res.status(400).send({ message: "Missing data to modify the user." });
  }

  users[userIndex] = { ...users[userIndex], age };
  res.send({ message: "Modified user", user: users[userIndex] });
});

// Delete user by id
router.delete("/:id", (req, res) => {
  const id = req.params;
  const removedUser = users.filter((u) => u.id !== id);
  if (!removedUser) return res.send({ message: "No such user!" });
  res.send({ message: "User has been removed!" });
});

module.exports = router;
