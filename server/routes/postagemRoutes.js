import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Postagem from '../mongodb/models/postagem.js';

dotenv.config();

const router = express.Router();

export default router;