module.exports = function (app) {
    app.get('/a', function (req, res) {
        res.send("advent of code a");
    });

    app.get('/b', function (req, res) {
        res.send("advent of code b");
    });
}