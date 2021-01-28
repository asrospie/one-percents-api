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


    app.post("/", async (req, res) => {
        // const response = await server.query(
        //     q.Login(
        //         q.Match('users_by_email', req.body.email),
        //         {
        //             password: req.body.password,
        //         }
        //     )
        // );
        // res.send(response);
        console.log(req);
        res.send(req);
    });

    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

main();