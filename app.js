/* jshint esversion: 6 */
const restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.listen(3978, () => {console.log('%s listening to %s', server.name, server.url);
});

server.get("/", (req, res) => {
    res.send("advent of code");
});

require('./1')(server);