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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const profane_words_1 = __importDefault(require("profane-words"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
// const guess = await prisma.guess.create({
//     data: {
//         guess: "pokeball",
//         count: 1,
//     }
// });
// const guess = await prisma.guess.delete({
//     where: {
//         id: 1,
//     }
// });
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guesses = yield prisma.guess.findMany();
    res.status(200).json(guesses);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`user guess: ${req.body.guess}`);
    const user_guess = req.body.guess.toLowerCase().split(" ").join("").split("-").join("").split("_").join("");
    console.log(`guess raw text: ${user_guess}`);
    for (let i = 0; i <= user_guess.length; i++) {
        if (profane_words_1.default.includes(user_guess.substring(0, i))) {
            console.log(`profanity detected: ${user_guess.substring(0, i)}`);
            res.status(200);
            return;
        }
    }
    const guess = yield prisma.guess.upsert({
        where: {
            guess: req.body.guess
        },
        update: {
            count: {
                increment: 1,
            }
        },
        create: {
            guess: req.body.guess,
            count: 1
        }
    });
    res.status(201).json(guess);
}));
exports.default = router;
