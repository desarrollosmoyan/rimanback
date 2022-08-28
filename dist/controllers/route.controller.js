"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoute = exports.createRoute = void 0;
const Route_model_1 = __importDefault(require("../models/Route.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const utils_1 = require("../utils");
const createRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const routeData = req.body;
        if ((0, utils_1.isEmpty)(routeData)) {
            return res.status(400).send({ message: "Can't create route" });
        }
        const currentUser = yield User_model_1.default.findById(id);
        if (!currentUser) {
            return res.status(200).send({ message: "Can't found user" });
        }
        const newRoute = new Route_model_1.default(routeData);
        if (!currentUser.route) {
            newRoute.user_id = currentUser._id;
            yield newRoute.save();
            currentUser.route = newRoute._id;
            yield currentUser.save();
            return res.status(200).send({
                message: "Route created successfuly",
                route: {
                    newRoute,
                },
            });
        }
        return res
            .status(400)
            .send({ message: "The current user has another route" });
    }
    catch (error) {
        res.status(400).send({ message: "Error" });
    }
});
exports.createRoute = createRoute;
const updateRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newInfo = req.body;
    const modifiedRoute = yield Route_model_1.default.findByIdAndUpdate(id, newInfo);
    res.send(modifiedRoute);
});
exports.updateRoute = updateRoute;
