"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const client_route_1 = __importDefault(require("./client.route"));
const routers = {
    authRouter: auth_route_1.default,
    clientRouter: client_route_1.default,
};
exports.default = routers;
