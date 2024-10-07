import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "./user/v1/user.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const SERVER_VERSION = "/api/v1/";

// Routes
app.use(SERVER_VERSION + "users", userRoutes);

// Fallback for non-existing routes
function routeNotFound(request: express.Request, response: express.Response) {
  response.status(404).json({
    message: "Route not found",
  });
}

app.use(routeNotFound);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/taller04")
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server
    app.listen(8080, () => {
      console.log("Server listening on port 8080");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
