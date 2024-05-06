import express, {Request, Response} from 'express';

const app = express();
const PORT = 8000;

app.get("/", (req: Request, res: Response) => res.send("Express on Vercell"));

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));

module.exports = app;