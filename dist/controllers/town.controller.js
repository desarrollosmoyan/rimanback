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
exports.createTown = void 0;
const Town_model_1 = __importDefault(require("../models/Town.model"));
const utils_1 = require("../utils");
const Route_model_1 = __importDefault(require("../models/Route.model"));
const createTown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const arrTowns = req.body;
        console.log(arrTowns);
        if ((0, utils_1.isEmpty)(arrTowns)) {
            return res.status(401).send({ message: "Your request is empty" });
        }
        const currentRoute = yield Route_model_1.default.findById(id);
        if (!currentRoute) {
            return res.status(400).send({ message: "Route not found" });
        }
        const arrOfModels = arrTowns.map((town) => {
            return new Town_model_1.default(Object.assign(Object.assign({}, town), { route_id: id }));
        });
        const l = arrOfModels.map((model) => {
            return model.save();
        });
        yield Promise.all(l)
            .then((model) => console.log("Promesa concluida"))
            .catch((err) => console.log(err));
        if (currentRoute.towns) {
            currentRoute.towns = [...currentRoute.towns, ...arrOfModels];
            yield currentRoute.save();
        }
        res.status(200).send(arrOfModels);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: "Can't create a town" });
    }
});
exports.createTown = createTown;
