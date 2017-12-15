module.exports = function (app) {
    app.post('/5a', function (req, res) {
        var input = req.body.split('\n');
        var exit = input.length;
        var index = 0;
        var steps = 0;
        while (index < exit) {
            var jump = parseInt(input[index]);
            input[index] = jump + 1;
            index += jump;
            steps++;
        }

        res.send("advent of code 5a : " + steps);
    });

    app.post('/5b', function (req, res) {
        var input = req.body.split('\n');
        var exit = input.length;
        var index = 0;
        var steps = 0;
        while (index < exit) {
            var jump = parseInt(input[index]);
            if (jump >= 3) {
                input[index] = jump - 1;
            } else {
                input[index] = jump + 1;
            }
            index += jump;
            steps++;
        }

        res.send("advent of code 5b : " + steps);
    });
}