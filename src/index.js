import express, { json } from 'express';
import cors from 'cors';

import authRouter from './routers/authRoutes.js';

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);

app.listen(5000, () => console.log('Server is listening...'));