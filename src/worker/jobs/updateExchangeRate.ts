import schedule from 'node-schedule';
import {JOB_UPDATE_EXCHANGE_RATE_RULE} from '../../config';

function start() {
    schedule.scheduleJob(
        'update-exchange-rates',
        JOB_UPDATE_EXCHANGE_RATE_RULE,
        async () => {
            //
        },
    );
}

export default {
    start,
};
