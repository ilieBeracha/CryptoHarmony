import express from 'express';
import { chatGpt } from '../3-logic/chatGptLogic';

export const TradesRoute = express.Router();

TradesRoute.post('/trades', async (req, res) => {
    const body = req.body;

    try {
        const resulst = await chatGpt(body);
        res.status(200).json(resulst)
    } catch (e) {
        res.status(400).json(e)
    }
})