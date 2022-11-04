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
exports.deleteClient = exports.updateClient = exports.createNewClientByTown = exports.createNewClient = exports.getAllClients = void 0;
const Client_model_1 = __importDefault(require("../models/Client.model"));
const Town_model_1 = __importDefault(require("../models/Town.model"));
const utils_1 = require("../utils");
const mongoose_1 = __importDefault(require("mongoose"));
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
        res.status(400).send({ message: "Seem like some information exist yet" });
    }
});
exports.createNewClient = createNewClient;
const createNewClientByTown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, utils_1.isEmpty)(req.body)) {
            return res.status(400).send({ message: "Por favor, rellena los campos" });
        }
        const clientData = req.body;
        const currentTown = yield Town_model_1.default.findById(id);
        if (!currentTown) {
            return res.status(404).send({ message: "Current town doesnt exist" });
        }
        const saveClient = new Client_model_1.default(Object.assign(Object.assign({}, clientData), { town_id: currentTown._id }));
        currentTown.clients = [...currentTown.clients, saveClient._id];
        yield saveClient.save();
        yield currentTown.save();
        console.log("xd");
        res
            .status(200)
            .json({ message: "Cliente creado exitosamente", client: saveClient });
    }
    catch (error) {
        res.status(400).send({
            message: "Seem like some information exist yet",
            error: error.message,
        }); // ->
    }
});
exports.createNewClientByTown = createNewClientByTown;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ client: req.body });
    try {
        const { id } = req.params;
        const newClientInfo = req.body;
        if ((0, utils_1.isEmpty)(newClientInfo)) {
            return res.status(401).send({ message: "At least 1 property to update" });
        }
        let client = yield Client_model_1.default.findById(id);
        if (!client)
            throw new Error("Client Not Found");
        if ((client === null || client === void 0 ? void 0 : client.town_id.toString()) !== req.body.town_id) {
            console.log("entrd hererr");
            const oldTown = yield Town_model_1.default.findById(client.town_id);
            const newTown = yield Town_model_1.default.findById(req.body.town_id);
            if (!oldTown || !newTown)
                throw new Error("Town Not Found");
            oldTown.clients = oldTown.clients.filter((townClient) => {
                console.log({ townClient: townClient._id, client: client._id });
                return townClient._id.toString() !== client._id.toString();
            });
            newTown.clients = [client._id, ...newTown.clients];
            yield oldTown.save();
            yield newTown.save();
            console.log({ changedOldTown: oldTown });
        }
        const test = yield Client_model_1.default.findByIdAndUpdate(client._id, Object.assign(Object.assign({}, req.body), { town_id: new mongoose_1.default.Types.ObjectId(req.body.town_id) }));
        res
            .status(200)
            .send({ message: "Client updated sucessfully", client: client });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientID = req.params.id;
        const client = yield Client_model_1.default.findById(clientID);
        if (!client)
            return res.status(400).json({ message: "No se encontró este cliente" });
        const clientTown = yield Town_model_1.default.findById(client.town_id);
        if (!clientTown)
            return res
                .status(400)
                .json({ message: "No se encontró el pueblo de este cliente" });
        const clientsFiltered = clientTown.clients.filter((client) => client.toString() !== clientID);
        clientTown.clients = clientsFiltered;
        yield clientTown.save();
        yield Client_model_1.default.findByIdAndDelete(clientID);
        res.status(200).json({ message: "Cliente eliminado con éxito" });
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
});
exports.deleteClient = deleteClient;
