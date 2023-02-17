import db from './db';
import http from './http';
import worker from './worker';

async function main() {
    await db.connect();
    await http.listen();
    worker.start();
}

main().catch((error) => console.error(error));
