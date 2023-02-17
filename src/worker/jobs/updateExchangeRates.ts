import fetch from 'node-fetch';
import schedule from 'node-schedule';
import {log} from '../../logger';
import {
    JOB_UPDATE_EXCHANGE_RATES_RULE,
    COINMARKETCAP_API_KEY,
    CRYPTOCOMPARE_API_KEY,
} from '../../config';
import {
    ExchangeRates,
    IExchangeRate,
    IExchangeRates,
} from '../../db/models/ExchangeRates';
import {Currency, Source} from '../../types';

interface ICoinMarketCapResult {
    status: {
        error_code: number;
        error_message: string;
    };
    data: {
        [key: string]: {
            quote: {
                USD: {
                    price: number;
                };
            };
        }[];
    };
}

async function getCoinMarketCapExchangeRates(): Promise<IExchangeRate[]> {
    const response = await fetch(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${Object.values(
            Currency,
        )
            .map((currency) => currency.toString())
            .join(',')}`,
        {
            headers: {
                'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
            },
        },
    );
    const result: ICoinMarketCapResult =
        (await response.json()) as ICoinMarketCapResult;
    if (result.status.error_code !== 0) {
        throw new Error(result.status.error_message);
    }
    return Object.values(Currency).map((currency) => ({
        currency,
        source: Source.CoinMarketCap,
        rate: result.data[currency.toString()][0].quote.USD.price,
    }));
}

interface ICryptoCompareResult {
    [key: string]: {USD: number};
}

async function getCryproCompareExchangeRates(): Promise<IExchangeRate[]> {
    const response = await fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${Object.values(
            Currency,
        )
            .map((currency) => currency.toString())
            .join(',')}&tsyms=USD`,
        {
            headers: {
                Authorization: `Apikey ${CRYPTOCOMPARE_API_KEY}`,
            },
        },
    );
    const result = (await response.json()) as ICryptoCompareResult;
    return Object.values(Currency).map((currency) => ({
        currency,
        source: Source.CryptoCompare,
        rate: result[currency.toString()].USD,
    }));
}

function createRequest(source: Source): Promise<IExchangeRate[]> {
    switch (source) {
        case Source.CoinMarketCap:
            return getCoinMarketCapExchangeRates();
        case Source.CryptoCompare:
            return getCryproCompareExchangeRates();
    }
}

async function handler() {
    const results = await Promise.allSettled(
        Object.values(Source).map(createRequest),
    );
    const exchangeRates: IExchangeRates = {
        rates: results
            .filter((result) => {
                if (result.status === 'fulfilled') {
                    return true;
                }
                log.error(
                    `update-exchange-rates job error: ${
                        (result.reason as Error).message
                    }`,
                );
                return false;
            })
            .map(
                (result) =>
                    (result as PromiseFulfilledResult<IExchangeRate[]>).value,
            )
            .flat(),
        created_at: new Date(),
    };
    await new ExchangeRates(exchangeRates).save();
}

function start() {
    schedule.scheduleJob(
        'update-exchange-rates',
        JOB_UPDATE_EXCHANGE_RATES_RULE,
        handler,
    );
}

export default {
    start,
    handler,
};
