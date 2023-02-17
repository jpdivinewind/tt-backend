/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

dotenv.config();

export const LOG_LEVEL = process.env['LOG_LEVEL'] || 'debug';

export const MONGO_URL =
    process.env['MONGO_URL'] || 'mongodb://127.0.0.1:27017/tt-backend';

export const PORT = process.env['PORT'] ? parseInt(process.env['PORT']) : 3000;

export const JOB_UPDATE_EXCHANGE_RATE_RULE =
    process.env['JOB_UPDATE_EXCHANGE_RATE_RULE'] || '* 2 * * * *'; // every 2 minutes

export const COINMARKETCAP_API_KEY = process.env['COINMARKETCAP_API_KEY']!;
if (!COINMARKETCAP_API_KEY) {
    throw new Error('COINMARKETCAP_API_KEY not specified');
}

export const CRYPTOCOMPARE_API_KEY = process.env['CRYPTOCOMPARE_API_KEY']!;
if (!CRYPTOCOMPARE_API_KEY) {
    throw new Error('CRYPTOCOMPARE_API_KEY not specified');
}
