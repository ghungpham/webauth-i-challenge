const server = require('./server.js');

const port = process.env.PORT || 4800;

server.listen(port, () => {
console.log(`==== Server Running on http://localhost:${port} ====`);
});
