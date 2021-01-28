import faunadb from 'faunadb';
import http from 'http';
import express from 'express';
require('dotenv').config();

// @ts-ignore
const FAUNA_SECRET: string = process.env.FAUNA_SECRET;
const port = 3000;

function main() {
    const app = express();

    const q = faunadb.query;
    const server = new faunadb.Client({
       secret: FAUNA_SECRET 
    });


    app.get("/", (req, res, next) => {
        res.send('Using https...');
    });

    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

main();