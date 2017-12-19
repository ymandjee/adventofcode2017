module.exports = function (app) {
    app.post('/10a', function (req, res) {
        var sequence = req.body.split(',');
        var input = [];
        for (var i = 0; i < 256; ++i) {
            input[i] = i;
        }
        var skip = 0;
        var startPos = 0;
        for (var i = 0; i < sequence.length; ++i) {
            console.log("length : " + parseInt(sequence[i]));
            var endPos = startPos + parseInt(sequence[i]) - 1;
            while (endPos > (input.length - 1)) endPos -= input.length;

            //Reverse
            for (var j = 0; j < parseInt(sequence[i]) / 2; ++j) {
                var tempEndPos = (endPos - j);
                var tempStartPos = (startPos + j);

                //Normalize position
                while (tempStartPos > (input.length - 1)) tempStartPos -= input.length;
                while (tempEndPos > (input.length - 1)) tempEndPos -= input.length;
                while (tempEndPos < 0) tempEndPos += input.length;

                var temp = input[tempEndPos];
                input[tempEndPos] = input[tempStartPos];
                input[tempStartPos] = temp;
            }

            startPos += parseInt(sequence[i]);
            startPos += skip++;
            while (startPos > (input.length - 1)) startPos -= input.length;
        }
        res.send("advent of code 10a : " + (input[0] * input[1]));
    });

    app.post('/10b', function (req, res) {
        var lengths = req.body.split('\n');
        var results = [];
        lengths.forEach(function (puzzle) {
            var sequence = [];
            for (var i = 0; i < puzzle.length; ++i) {
                sequence.push(puzzle.charCodeAt(i));
            }
            sequence.push(17);
            sequence.push(31);
            sequence.push(73);
            sequence.push(47);
            sequence.push(23);
            var input = [];
            for (var i = 0; i < 256; ++i) {
                input[i] = i;
            }

            var skip = 0;
            var startPos = 0;
            for (var r = 0; r < 64; ++r) {
                for (var i = 0; i < sequence.length; ++i) {
                    console.log("length : " + parseInt(sequence[i]));
                    var endPos = startPos + parseInt(sequence[i]) - 1;
                    while (endPos > (input.length - 1)) endPos -= input.length;

                    //Reverse
                    for (var j = 0; j < parseInt(sequence[i]) / 2; ++j) {
                        var tempEndPos = (endPos - j);
                        var tempStartPos = (startPos + j);

                        //Normalize position
                        while (tempStartPos > (input.length - 1)) tempStartPos -= input.length;
                        while (tempEndPos > (input.length - 1)) tempEndPos -= input.length;
                        while (tempEndPos < 0) tempEndPos += input.length;

                        var temp = input[tempEndPos];
                        input[tempEndPos] = input[tempStartPos];
                        input[tempStartPos] = temp;
                    }

                    startPos += parseInt(sequence[i]);
                    startPos += skip++;
                    while (startPos > (input.length - 1)) startPos -= input.length;
                }
            }

            var hash = [];
            for (var i = 0; i < input.length; i += 16) {
                hash.push(
                    input[0 + i] ^ input[1 + i] ^ input[2 + i] ^ input[3 + i] ^
                    input[4 + i] ^ input[5 + i] ^ input[6 + i] ^ input[7 + i] ^
                    input[8 + i] ^ input[9 + i] ^ input[10 + i] ^ input[11 + i] ^
                    input[12 + i] ^ input[13 + i] ^ input[14 + i] ^ input[15 + i]);
            }

            var knotHash = "";
            hash.forEach(function (element) {
                var hex = element.toString(16);
                if ((hex.length % 2) > 0) { hex = "0" + hex; }
                knotHash += hex;
            }, this);
            results.push({ puzzle: puzzle, knotHash: knotHash });
        }, this);

        var message = "";
        results.forEach(function (element) {
            message += element.puzzle + " has a knot hash of " + element.knotHash + "\n";

        }, this);

        res.send("advent of code 10b : " + message);
    });
}