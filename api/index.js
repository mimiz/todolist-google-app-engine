// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router({
    tasks: [
        {
            id: 1,
            title: 'A thing to to',
            done: false,
        },
    ],
});
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
