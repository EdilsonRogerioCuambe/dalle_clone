import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuartion = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: 'https://api.openai.com/v1'
});

const openai = new OpenAIApi(configuartion);

router.post('/', async (req, res) => {
    const { texto } = req.body;
    const response = await openai.completions({
        engine: 'davinci',
        prompt: texto,
        maxTokens: 100,
        temperature: 0.7,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
        stop: ['\n', '']
    });
    res.send(response.data.choices[0].text);
});

export default router;