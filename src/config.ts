import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URL =
    process.env['MONGO_URL'] || 'mongodb://127.0.0.1:27017/tt-backend';

export const PORT = process.env['PORT'] ? parseInt(process.env['PORT']) : 3000;

export const JOB_UPDATE_EXCHANGE_RATE_RULE =
    process.env['JOB_UPDATE_EXCHANGE_RATE_RULE'] || '* 2 * * * *'; // every 2 minutes
