import db from './db';
import http from './http';

async function main() {
    await db.connect();
    await http.listen();
}

main().catch((error) => console.error(error));
