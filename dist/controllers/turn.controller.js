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
exports.endTurn = void 0;
const Turn_model_1 = __importDefault(require("../models/Turn.model"));
const utils_1 = require("../utils");
const User_model_1 = __importDefault(require("../models/User.model"));
const endTurn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, orders } = req.body;
    try {
        const userFounded = yield User_model_1.default.findById(user);
        if (!userFounded) {
            return res.status(404).send({ message: "user not found" });
        }
        const turnList = yield Turn_model_1.default.find({ user: user }).sort({
            endDate: "asc",
        });
        const prevTurn = turnList[0];
        const newTurn = new Turn_model_1.default(Object.assign(Object.assign({}, req.body), { startDate: Date.now() }));
        if (userFounded.currentTurn) {
            userFounded.currentTurn = newTurn._id;
        }
        if (prevTurn) {
            prevTurn.hasEnded = true;
            prevTurn.endDate = new Date(Date.now());
            yield (0, utils_1.addUncompletedTurns)(prevTurn, newTurn);
            yield prevTurn.save();
        }
        yield newTurn.save();
        yield userFounded.save();
        res.status(200).send({
            message: "Turn created successfuly",
            turn: {
                newTurn,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: "error", error: error });
    }
});
exports.endTurn = endTurn;
