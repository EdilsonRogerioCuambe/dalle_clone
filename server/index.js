import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postagemRoutes from './routes/postagemRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/postagem', postagemRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.send('Olá mundo!');
});

const port = process.env.PORT || 8000;

const server = async () => {

    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

server();