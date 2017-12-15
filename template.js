module.exports = function (app) {
    app.post('/a', function (req, res) {
        res.send("advent of code a");
    });

    app.post('/b', function (req, res) {
        res.send("advent of code b");
    });
}