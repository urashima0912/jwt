const express = require("express");
const routes = require("./routes");

const server = express();
// Settings.
server.set("PORT", 4500);

// Middlewares.
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Routes.
server.use("/api", routes.api);

// Public folder.

module.exports = server;
