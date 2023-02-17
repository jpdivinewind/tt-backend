import db from './db';
import http from './http';
import socket from './socket';
import worker from './worker';

async function main() {
    await db.connect();
    await http.listen();
    socket.connect(http.server);
    worker.start();
}

main().catch((error) => console.error(error));
