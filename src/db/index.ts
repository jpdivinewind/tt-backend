import mongoose from 'mongoose';
import {MONGO_URL} from '../config';

async function connect() {
    await mongoose.connect(MONGO_URL);
}

export default {
    connect,
};
