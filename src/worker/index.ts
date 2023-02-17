import updateExchangeRate from './jobs/updateExchangeRate';

function start() {
    updateExchangeRate.start();
}

export default {
    start,
};
