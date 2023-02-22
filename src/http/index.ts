import Fastify from 'fastify';
import {PORT} from '../config';
import {log} from '../logger';
import routes from './routes';
import cors from '@fastify/cors';
import {CORS_ORIGIN} from '../config';

const app = Fastify({logger: log});

routes(app);

async function listen() {
    await app.register(cors, {origin: CORS_ORIGIN});
    await app.listen({host: '0.0.0.0', port: PORT});
}

export default {
    listen,
    server: app.server,
};
