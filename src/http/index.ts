import Fastify from 'fastify';
import {CORS_CREDS, CORS_HEADERS, CORS_METHODS, PORT} from '../config';
import {log} from '../logger';
import routes from './routes';
import cors from '@fastify/cors';
import {CORS_ORIGIN} from '../config';

const app = Fastify({logger: log});

routes(app);

async function listen() {
    await app.register(cors, {
        origin: CORS_ORIGIN,
        methods: CORS_METHODS,
        allowedHeaders: CORS_HEADERS,
        credentials: CORS_CREDS,
    });
    await app.listen({host: '0.0.0.0', port: PORT});
}

export default {
    listen,
    server: app.server,
};
