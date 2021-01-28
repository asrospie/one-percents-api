var faunadb = require('faunadb');

function main() {
    q = faunadb.query

    const server = new faunadb.Client({
        secret: 'fnAEAibbqDACAjGhdnp6I-C6Cvxj03LHbNnFpbYn'
    });

    let client_secret = '';

    server.query(
        q.Login(
            q.Match('users_by_email', 'asrospierski@gmail.com'),
            {
                password: 'Veritas@281',
            }
        )
    ).then(res => {
        client_secret = res.secret;
        const client = new faunadb.Client({
            secret: client_secret,
        });

        client.query(
            q.Get(q.Ref(q.Collection('users'), '288823046193545731'))
        ).then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e);
        });
        client.query(
            q.Logout(true)
        );
    }).catch(e => {
        console.log(e);
    });

    
}

main();