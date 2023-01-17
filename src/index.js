import express, { json } from 'express';
import cors from 'cors';

import authRouter from './routers/authRoutes.js';
import sessionRouter from './routers/sessionRoutes.js';

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(sessionRouter);

app.listen(5000, () => console.log('Server is listening...'));