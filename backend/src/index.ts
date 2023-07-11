import http from 'http'
import { app } from './app'
import { DBConnect } from './database';
const port = process.env.PORT || 3000;


function closeServerEvents() {
    process.on('SIGINT', () => {
        console.debug("closing server")
        process.exit(1)
    })

    process.on('uncaughtException', function (err) {
        console.debug("[Uncaught exception]")
        console.error(err);
        process.exit()
    })

}

async function database() {
    DBConnect.connect("local")
    
}

async function server() {
    const server = http.createServer(app(database));
    closeServerEvents()
    server.listen(port);
}

server()
