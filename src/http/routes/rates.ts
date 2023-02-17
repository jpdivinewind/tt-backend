import {FastifyInstance} from 'fastify';
import {ExchangeRates, IExchangeRates} from '../../db/models/ExchangeRates';
import updateExchangeRates from '../../worker/jobs/updateExchangeRates';

interface IGetRatesHistoryQuerystring {
    page?: number;
    from?: number;
    to?: number;
}

export default function (app: FastifyInstance) {
    app.get('/rates/current', async (_, res) => {
        const currentExchangeRates = await ExchangeRates.findOne({});
        const result: IExchangeRates = currentExchangeRates?.toJSON() || {
            rates: [],
            created_at: new Date(),
        };
        await res.send(result);
    });

    app.get<{Querystring: IGetRatesHistoryQuerystring}>(
        '/rates/history',
        {
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        page: {type: 'number'},
                        from: {type: 'number'},
                        to: {type: 'number'},
                    },
                },
            },
        },
        async (req, res) => {
            const {page, from, to} = req.query;
            const query: {
                created_at?: {
                    $gte?: number;
                    $lte?: number;
                };
            } = {};
            if (from || to) {
                query.created_at = {};
                if (from) {
                    query.created_at.$gte = from;
                }
                if (to) {
                    query.created_at.$lte = to;
                }
            }
            const paginateResult = await ExchangeRates.paginate(query, {page});
            await res.send({
                rates: paginateResult.docs.map((doc) => doc.toJSON()),
                page,
                pages: paginateResult.totalPages,
            });
        },
    );

    // TODO: use some admin credentials?
    app.post('/rates/update', async (_, res) => {
        await updateExchangeRates.handler();
        await res.send('OK');
    });
}
