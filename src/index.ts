// Imports modules
import express from "express";
import http from "http";

// Initialization app
const app = express();
const server = http.createServer(app);

// Import my app.
import { Nodemail } from "./app/main";
const nodemail = new Nodemail(app, server);
nodemail.start(); // Server run!
nodemail.connectDB(); // Connect db
