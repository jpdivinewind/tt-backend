import {Server as SocketServer} from 'socket.io';
import {Server} from 'http';

let socketServer: SocketServer | null = null;

function connect(server: Server) {
    socketServer = new SocketServer(server);
}

function emit(ev: string, ...args: unknown[]) {
    socketServer?.emit(ev, ...args);
}

export default {
    connect,
    emit,
};
