module.exports = function (app) {
    app.post('/11a', function (req, res) {
        var inputs = req.body.split('\n');
        var results = [];
        inputs.forEach(function (input) {
            var moves = { n: 0, ne: 0, se: 0, s: 0, sw: 0, nw: 0 };
            input.split(',').forEach(function (move) {
                if (!moves[move]) {
                    moves[move] = 1;
                } else {
                    moves[move]++;
                }
            }, this);

            reduce(moves);
            merge(moves);
            var total = 0;
            for (var obj in moves) {
                total += moves[obj];
            }
            results.push(total);
        }, this);
        res.send("advent of code 11a " + results.join(';'));
    });

    app.post('/11b', function (req, res) {
        var inputs = req.body.split('\n');
        var results = [];
        inputs.forEach(function (input) {
            var moves = { n: 0, ne: 0, se: 0, s: 0, sw: 0, nw: 0 };
            var iterations = [];
            var max = 0;
            input.split(',').forEach(function (move) {
                if (!moves[move]) {
                    moves[move] = 1;
                } else {
                    moves[move]++;
                }
                iterations.push(Object.assign({}, moves));
            }, this);

            var max = 0;
            iterations.forEach(function (iteration) {
                reduce(iteration);
                merge(iteration);
                var total = 0;
                for (var obj in iteration) {
                    total += iteration[obj];
                }
                if (total >  max) max = total;
            }, this);
            results.push(max);
        }, this);
        res.send("advent of code 11b " + results.join(';'));
    });
}

function reduce(moves) {
    //Cancel opposites
    if (moves.n >= moves.s) {
        moves.n -= moves.s;
        moves.s = 0;
    }
    if (moves.s > moves.n) {
        moves.s -= moves.n;
        moves.n = 0;
    }
    if (moves.se >= moves.nw) {
        moves.se -= moves.nw;
        moves.nw = 0;
    }
    if (moves.nw > moves.se) {
        moves.nw -= moves.se;
        moves.se = 0;
    }
    if (moves.sw >= moves.ne) {
        moves.sw -= moves.ne;
        moves.ne = 0;
    }
    if (moves.ne > moves.sw) {
        moves.ne -= moves.sw;
        moves.sw = 0;
    }
}

function merge(moves) {
    //Clockwise search
    if (moves.ne >= moves.s) {
        moves.ne -= moves.s;
        moves.se += moves.s;
        moves.s = 0;
    }
    if (moves.se > moves.sw) {
        moves.se -= moves.sw;
        moves.s += moves.sw;
        moves.sw = 0;
    }
    if (moves.s >= moves.nw) {
        moves.s -= moves.nw;
        moves.sw += moves.nw;
        moves.nw = 0;
    }
    if (moves.sw > moves.n) {
        moves.sw -= moves.n;
        moves.nw += moves.n;
        moves.n = 0;
    }
    if (moves.nw > moves.ne) {
        moves.nw -= moves.ne;
        moves.n += moves.ne;
        moves.ne = 0;
    }
    if (moves.n > moves.se) {
        moves.n -= moves.se;
        moves.ne += moves.se;
        moves.se = 0;
    }

    //Anti-clockwise search
    if (moves.ne < moves.s) {
        moves.s -= moves.ne;
        moves.se += moves.ne;
        moves.ne = 0;
    }
    if (moves.se < moves.sw) {
        moves.sw -= moves.se;
        moves.s += moves.se;
        moves.se = 0;
    }
    if (moves.s < moves.nw) {
        moves.nw -= moves.s;
        moves.sw += moves.s;
        moves.s = 0;
    }
    if (moves.sw < moves.n) {
        moves.n -= moves.sw;
        moves.nw += moves.sw;
        moves.sw = 0;
    }
    if (moves.nw < moves.ne) {
        moves.ne -= moves.nw;
        moves.n += moves.nw;
        moves.nw = 0;
    }
    if (moves.n < moves.se) {
        moves.se -= moves.n;
        moves.ne += moves.n;
        moves.n = 0;
    }
}