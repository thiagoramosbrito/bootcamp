//const express = require("express");
import express from "express";
const server = express();

server.use(express.json());

server.listen(3000);

const projects = [
  {
    id: 1,
    title: "novo projeto",
    tasks: [],
  },
];

console.log(projects);
