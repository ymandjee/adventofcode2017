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

require('./template')(server);
require('./1')(server);
require('./2')(server);
require('./3')(server);
require('./4')(server);
require('./5')(server);
require('./6')(server);
require('./7')(server);
require('./8')(server);
require('./9')(server);
require('./10')(server);
require('./11')(server);