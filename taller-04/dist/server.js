"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./user/v1/user.routes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const SERVER_VERSION = "/api/v1/";
// Routes
app.use(SERVER_VERSION + "users", user_routes_1.default);
// Fallback for non-existing routes
function routeNotFound(request, response) {
    response.status(404).json({
        message: "Route not found",
    });
}
app.use(routeNotFound);
// Connect to MongoDB
mongoose_1.default
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
