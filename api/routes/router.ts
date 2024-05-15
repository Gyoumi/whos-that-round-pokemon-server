import express, {Router, Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import words from 'profane-words';

const prisma = new PrismaClient();
const router = express.Router();


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
router.get("/", async (req, res) => {
    const guesses = await prisma.guess.findMany();
    res.status(200).json(guesses);
});

router.post("/", async (req, res) => {
    console.log(`user guess: ${req.body.guess}`);
    const user_guess = req.body.guess.toLowerCase().split(" ").join("").split("-").join("").split("_").join("");
    console.log(`guess raw text: ${user_guess}`);

    for(let i = 0; i <= user_guess.length; i++) {
        if(words.includes(user_guess.substring(0, i))) {
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

export default router;