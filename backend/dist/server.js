"use strict";const express = require("express");
//import express from "express";
const server = express();

server.use(express.json());

const projects = [
  {
    id: 1,
    title: "novo projeto",
    tasks: [],
  },
];

console.log(projects);
