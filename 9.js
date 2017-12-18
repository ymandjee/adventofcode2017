module.exports = function (app) {
    app.post('/9a', function (req, res) {
        var streams = req.body.split('\n');
        var scores = [];
        streams.forEach(function (stream) {
            var originalStream = stream;
            stream = stream.replace(/!./g, "");
            stream = stream.replace(/<[^\b>]*>/g, "");
            var opening = stream.indexOf("{");
            var closing = stream.lastIndexOf("}");
            stream = stream.substring(opening, closing + 1);
            var score = 0;
            var multiplier = 1;
            while (stream != "") {
                stream = stream.replace(/{[^{}]*}/g, "{}");
                for (var i = 0; i < stream.length - 1; ++i) {
                    if (stream[i] == '{' && stream[i + 1] == '}') {
                        score += multiplier;
                        stream = stream.slice(0, i) + stream.slice(i + 2);
                        i--;
                    }
                    else if (stream[i] == '{') multiplier++;
                    else if (stream[i] == '}') multiplier--;
                }
                multiplier--;
            }
            scores.push({ stream: originalStream, score: score });
        }, this);
        var message = "";
        scores.forEach(function (element) {
            message += element.stream + " has a score of " + element.score + ". ";
        }, this);

        res.send("advent of code 9a : " + message);
    });

    app.post('/9b', function (req, res) {
        var streams = req.body.split('\n');
        var scores = [];
        streams.forEach(function (stream) {
            var originalStream = stream;
            stream = stream.replace(/!./g, "");
            var matches = stream.match(/<[^\b>]*>/g);
            if (matches) {
                var total = 0;
                for (var i = 0; i < matches.length; ++i) {
                    total += matches[i].length - "<>".length;
                }
                scores.push({ stream: originalStream, score: total });
            }
        }, this);
        var message = "";
        scores.forEach(function (element) {
            message += element.stream + " has a garbage score of " + element.score + ". ";
        }, this);

        res.send("advent of code 9b : " + message);
    });
}