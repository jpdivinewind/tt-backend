import {FastifyInstance} from 'fastify';
import rates from './rates';

export default function (app: FastifyInstance) {
    rates(app);
}
