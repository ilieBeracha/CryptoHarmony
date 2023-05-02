import express, { json } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { UserRoute } from './4-controllers/userRoute';
import { TradesRoute } from './4-controllers/tradesRoute';
import { IndicatorsRoute } from './4-controllers/indicatorsRoute';
dotenv.config();

const server = express();

server.use(json());
server.use(cors());

server.use('/api', UserRoute)
server.use('/api', TradesRoute)
server.use('/api', IndicatorsRoute)

server.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
})

