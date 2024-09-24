import express from "express";

import userController from "./src/controllers/users.controllers.js";

const server = express();

const port = 8080;

const ready = () => console.log("server running on port " + port)

server.listen(port, ready);

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get("/api/users", userController.readUsers);

server.post("/api/users", userController.createUser);