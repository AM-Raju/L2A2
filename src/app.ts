import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application route
// app.use('api/v1/users');

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
