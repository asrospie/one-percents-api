import faunadb from 'faunadb';
import http from 'http';
import express from 'express';
require('dotenv').config();

// @ts-ignore
const FAUNA_SECRET: string = process.env.FAUNA_SECRET;
const port = process.env.PORT;

async function main() {
    const app = express();

    const q = faunadb.query;
    const server = new faunadb.Client({
       secret: FAUNA_SECRET 
    });


    app.get("/", async (req, res) => {
        if (!req.body.email) {
            console.log('no email');
            res.send('not a valid request');
            return;
        }
        const response = await server.query(
            q.Login(
                q.Match('users_by_email', req.body.email),
                {
                    password: req.body.password,
                }
            )
        );
        res.send(response);
    });

    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

main();