import updateExchangeRates from './jobs/updateExchangeRates';

function start() {
    updateExchangeRates.start();
}

export default {
    start,
};
