module.exports = function (app) {
    app.post('/2a', function (req, res) {
        var rows = req.body.split('\n');
        var sum = 0;
        rows.forEach(function (row) {
            if (row) {
                var min = Number.MAX_SAFE_INTEGER;
                var max = 0;
                var numbers = row.split('\t');
                numbers.forEach(function (element) {
                    var value = parseInt(element);
                    if (value < min) {
                        min = value;
                    }
                    if (value > max) {
                        max = value;
                    }

                }, this);
                sum += (max - min);
            }
        }, this);
        res.send("advent of code 2a : " + sum);
    });

    app.post('/2b', function (req, res) {
        var rows = req.body.split('\n');
        var sum = 0;
        rows.forEach(function (row) {
            if (row) {
                var numbers = row.split('\t');
                var result = 0;
                for(var i = 0; i < numbers.length - 1; ++i){
                    var current = parseInt(numbers[i]);
                    for(var j = i + 1; j < numbers.length; ++j){
                        var next = parseInt(numbers[j]);
                        if(next / current > 1 && next % current == 0) {
                            result = next / current;
                        } else if (current / next && current % next == 0){
                            result = current / next;
                        }
                    }
                }
                sum += result;
            }
        }, this);
        res.send("advent of code 2a : " + sum);
    });
}