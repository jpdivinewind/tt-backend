import {Server as SocketServer} from 'socket.io';
import {Server} from 'http';
import {CORS_ORIGIN} from '../config';

let socketServer: SocketServer | null = null;

function connect(server: Server) {
    socketServer = new SocketServer(server, {cors: {origin: CORS_ORIGIN}});
}

function emit(ev: string, ...args: unknown[]) {
    socketServer?.emit(ev, ...args);
}

export default {
    connect,
    emit,
};
