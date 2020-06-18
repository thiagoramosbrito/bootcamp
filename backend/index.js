const express = require("express");

const server = express();

server.use(express.json());

//Query params = ?teste=1
//Route params = /users/1
//Request body =  {"name":"Thiago", "email":"britoarteiro@gmail.com"}

const users = ["Thiago", "Natalia", "Olivia"];

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User not found on request body" });
  }
  return next();
}

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; Url: ${req.url}`);

  next();

  console.timeEnd("Request");
});

//Lista todos usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

//Lista 1 usuário
server.get("/users/:index", checkUserInArray, checkUserInArray, (req, res) => {
  return res.json(req.user);
});

//Posta usuário
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

//Edita usuário
server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);
});

//Deleta usuário
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
