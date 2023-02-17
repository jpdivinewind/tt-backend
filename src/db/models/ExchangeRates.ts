import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import {Currency, Source} from '../../types';

export interface IExchangeRate {
    currency: Currency;
    source: Source;
    rate: number;
}

export interface IExchangeRates {
    rates: IExchangeRate[];
    createdAt: Date;
}

const ExchangeRatesSchema: mongoose.Schema<IExchangeRatesDocument> =
    new mongoose.Schema(
        {
            rates: [
                {
                    currency: {
                        type: String,
                        enum: Object.values(Currency),
                        required: true,
                    },
                    source: {
                        type: String,
                        enum: Object.values(Source),
                        required: true,
                    },
                    rate: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
        {timestamps: true},
    );

ExchangeRatesSchema.plugin(paginate);

export interface IExchangeRatesDocument
    extends IExchangeRates,
        mongoose.Document {}

export const ExchangeRates = mongoose.model<
    IExchangeRatesDocument,
    mongoose.PaginateModel<IExchangeRatesDocument>
>('exchange_rates', ExchangeRatesSchema);
