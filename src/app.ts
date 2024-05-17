import express from 'express';
import { config } from "dotenv";
import cors from 'cors';
import router from './routes/router';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const page = process.env.PAGE || "http://localhost:3000";
app.use(cors({
    origin: page,
}));

app.use('/', router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})