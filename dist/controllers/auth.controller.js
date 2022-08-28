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
exports.signin = exports.signup = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const Turn_model_1 = __importDefault(require("../models/Turn.model"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(req.body);
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
        return res.status(200).send({
            message: "User created successfuly",
            user: {
                newUser,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Can't create user" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userFound = yield User_model_1.default.findOne({ email });
        if (!userFound) {
            return res.json(404).send({
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
                populate: { path: "clients", model: "client" },
            },
        });
        const elepe = yield userFound.populate({
            path: "currentTurn",
            model: "turn",
        });
        return res.status(200).send({ user: userFound });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
    }
});
exports.signin = signin;
