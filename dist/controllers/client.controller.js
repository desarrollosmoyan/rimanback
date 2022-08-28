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
exports.updateClient = exports.createNewClientByTown = exports.createNewClient = exports.getAllClients = void 0;
const Client_model_1 = __importDefault(require("../models/Client.model"));
const Town_model_1 = __importDefault(require("../models/Town.model"));
const utils_1 = require("../utils");
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientList = yield Client_model_1.default.find({});
        return res.status(200).send({ results: clientList });
    }
    catch (error) {
        return res.status(400).send({ message: error });
    }
});
exports.getAllClients = getAllClients;
const createNewClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, utils_1.isEmpty)(req.body)) {
            return res.status(401).send({ message: "body is empty" });
        }
        const { email, orders, name, nit, cellphone, bill } = req.body;
        const saveClient = new Client_model_1.default({
            name,
            email,
            orders,
            nit,
            cellphone,
            bill,
        });
        yield saveClient.save();
        res
            .status(200)
            .json({ message: "Client created successfuly", client: saveClient });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: "Seem like some information exist yet" });
    }
});
exports.createNewClient = createNewClient;
const createNewClientByTown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, utils_1.isEmpty)(req.body)) {
            return res.status(401).send({ message: "Request body can't be " });
        }
        const { email, orders, name, nit, cellphone, bill } = req.body;
        const saveClient = new Client_model_1.default({
            name,
            email,
            orders,
            nit,
            cellphone,
            bill,
        });
        const currentTown = yield Town_model_1.default.findById(id);
        if (!currentTown) {
            return res.status(404).send({ message: "Current town doesnt exist" });
        }
        currentTown.clients = [...currentTown.clients, saveClient._id];
        yield saveClient.save();
        yield currentTown.save();
        res
            .status(200)
            .json({ message: "Client created successfuly", client: saveClient });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: "Seem like some information exist yet" });
    }
});
exports.createNewClientByTown = createNewClientByTown;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const newClientInfo = req.body;
        if ((0, utils_1.isEmpty)(newClientInfo)) {
            return res.status(401).send({ message: "At least 1 property to update" });
        }
        const client = yield Client_model_1.default.findByIdAndUpdate(id, newClientInfo);
        res
            .status(200)
            .send({ message: "Client updated sucessfuly", client: client });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
});
exports.updateClient = updateClient;
