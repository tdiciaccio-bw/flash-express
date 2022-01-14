import express from 'express';
import cors from 'cors';
import { router as heartBeatController } from './routes/heartbeat';
import { router as apiController } from './routes/api';
import auth from './middleware/auth';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(auth);

app.use('/', heartBeatController);
app.use('/api', apiController);

module.exports = app;
