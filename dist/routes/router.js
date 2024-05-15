"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const profane_words_1 = __importDefault(require("profane-words"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", async (_, res) => {
    const guesses = await prisma.guess.findMany();
    res.status(200).json(guesses);
});
router.post("/", async (req, res) => {
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
    const guess = await prisma.guess.upsert({
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
});
exports.default = router;
//# sourceMappingURL=router.js.map