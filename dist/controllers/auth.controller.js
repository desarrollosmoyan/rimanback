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
exports.patchUser = exports.getUser = exports.signin = exports.signup = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const Town_model_1 = __importDefault(require("../models/Town.model"));
const Turn_model_1 = __importDefault(require("../models/Turn.model"));
const Client_model_1 = __importDefault(require("../models/Client.model"));
const Order_model_1 = __importDefault(require("../models/Order.model"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const newUser = new User_model_1.default({
            email,
            password,
        });
        const newTurn = new Turn_model_1.default({
            startDate: Date.now(),
            user: newUser._id,
        });
        newUser.currentTurn = newTurn._id;
        yield newUser.save();
        yield newTurn.save();
        return res.status(200).send({
            message: "User created successfuly",
            user: {
                newUser,
            },
        });
    }
    catch (error) {
        return res.status(400).json({ message: "Can't create user" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userFound = yield User_model_1.default.findOne({ email });
        if (!userFound) {
            return res.status(404).send({
                message: "Usuario no encontrado",
            });
        }
        const hasPasswordMatched = User_model_1.default.comparePassword(password, userFound.password);
        if (!hasPasswordMatched) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        yield userFound.populate({
            path: "route",
            populate: {
                path: "towns",
                model: "town",
                populate: {
                    path: "clients",
                    model: "client",
                    populate: {
                        path: "orders",
                        model: "order",
                    },
                },
            },
        });
        yield userFound.populate({
            path: "currentTurn",
            populate: {
                path: "orders",
            },
        });
        return res.status(200).send({ user: userFound });
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
exports.signin = signin;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_model_1.default.findById(id);
        if (!user) {
            return res.status(400).send({ message: "Usuario no encontrado" });
        }
        yield user.populate({
            path: "route",
            populate: {
                path: "towns",
                model: "town",
                populate: {
                    path: "clients",
                    model: "client",
                    populate: {
                        path: "orders",
                        model: "order",
                    },
                },
            },
        });
        yield user.populate({
            path: "currentTurn",
            populate: {
                path: "orders",
            },
        });
        res.status(200).send({
            message: "Usuario encontrado con éxito",
            user: {
                user,
            },
        });
    }
    catch (error) {
        res.status(400).send({ message: "Error", error: error.message });
    }
});
exports.getUser = getUser;
const patchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        if (!userData) {
            return res.status(404).send({ message: "User not found" });
        }
        const routeId = userData.route._id;
        const turnId = userData.currentTurn._id;
        yield userData.route.towns.map((town) => __awaiter(void 0, void 0, void 0, function* () {
            let clientsIds = yield Promise.all(town.clients.map((client) => __awaiter(void 0, void 0, void 0, function* () {
                const clientExists = yield Client_model_1.default.findById(client._id);
                if (clientExists)
                    return client._id;
                const ordersIds = yield client.orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
                    const orderExists = yield Order_model_1.default.findById(order._id);
                    if (orderExists)
                        return order._id;
                    const newOrder = new Order_model_1.default(order);
                    yield newOrder.save();
                    return newOrder._id;
                }));
                const newClient = new Client_model_1.default(Object.assign(Object.assign({}, client), { orders: ordersIds }));
                yield newClient.save();
                return newClient._id;
            })));
            town.clients = clientsIds;
            yield Town_model_1.default.findByIdAndUpdate(town._id, { clients: clientsIds });
        }));
        const userUpdated = yield User_model_1.default.findByIdAndUpdate(userData._id, {
            route_id: routeId,
            currentTurn: turnId,
        });
        res.status(200).send({ message: "Updated successfuly", user: userUpdated });
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
exports.patchUser = patchUser;
