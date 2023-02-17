import Fastify from 'fastify';
import {PORT} from '../config';
import routes from './routes';

const app = Fastify({logger: true});

routes(app);

async function listen() {
    const address = await app.listen({host: '0.0.0.0', port: PORT});
    app.log.info(`Listening at ${address}`);
}

export default {
    listen,
};
