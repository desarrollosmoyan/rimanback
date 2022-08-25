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
exports.createClientByTown = exports.createTown = void 0;
const Client_model_1 = __importDefault(require("../models/Client.model"));
const Town_model_1 = __importDefault(require("../models/Town.model"));
const utils_1 = require("../utils");
const createTown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const townData = req.body;
        if ((0, utils_1.isEmpty)(townData)) {
            return res.status(401).send({ message: "Your request is empty" });
        }
        const newTown = new Town_model_1.default(townData);
        res.status(200).send(newTown);
    }
    catch (error) {
        res.status(400).send({ message: "Can't create a town" });
    }
});
exports.createTown = createTown;
const createClientByTown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, cellphone, nit, bill, email, orders } = req.body;
        if ((0, utils_1.isEmpty)(req.body)) {
            return res.status(401).send({ message: "Your request is empty" });
        }
        const currentTown = yield Town_model_1.default.findById(id);
        const newClient = new Client_model_1.default({
            name,
            cellphone,
            nit,
            bill,
            email,
            orders,
        });
        if (currentTown) {
            currentTown.clients = [...currentTown.clients, newClient];
        }
    }
    catch (error) {
        res.status(400).send({ message: "Can't create a client in this town" });
    }
});
exports.createClientByTown = createClientByTown;
