"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// API ROUTES IMPORTS
const user_routes_1 = __importDefault(require("./user/v1/user.routes"));
// MIDDLEWARES
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ROUTES
const SERVER_VERSION = "/api/v1/";
app.use(SERVER_VERSION + "users", user_routes_1.default);
// FALLBACKS
function routeNotFound(request, response) {
    response.status(404).json({
        message: "Route not found.",
    });
}
app.use(routeNotFound);
// START SERVER
app.listen(8080, () => {
    console.log("Server listening to port 8080.");
});
