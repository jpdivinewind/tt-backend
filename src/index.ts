import db from './db';

async function main() {
    await db.connect();
}

main().catch((error) => console.error(error));
