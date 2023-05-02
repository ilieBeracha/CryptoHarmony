import express from 'express';
import { getRsiByPair } from '../3-logic/indicatorsLogic';

export const IndicatorsRoute = express.Router();

IndicatorsRoute.post('/indicators/rsi', async (req, res) => {
    const data = req.body;
    console.log(data);
    
    try {
        const resulst = await getRsiByPair(data);
        res.status(200).json(resulst)
    } catch (e) {
        res.status(400).json(e)
    }
});