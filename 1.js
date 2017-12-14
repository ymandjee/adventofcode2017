module.exports = function (app) {
    app.get('/1a', function (req, res) {
        var input = req.query.input;
        var sum = 0;
        var ptr = null;
        var index = 0;
        for(var i = 0; i <= input.length; ++i)
        {
            index = i;
            if(i == input.length)
            {
                index = 0;
            }

            if(ptr == input[index])
            {
                sum += parseInt(input[index]);
            }
            ptr = input[index];
        }
        res.send("advent of code 1 : " + sum);
    });

    app.get('/1b', function (req, res) {
        var input = req.query.input;
        var sum = 0;
        var next = 0;
        var offset = input.length / 2;
        for(var i = 0; i < input.length; ++i)
        {
            next = i+offset;
            if(next >= input.length)
            {
                next = Math.abs(input.length - next) ;
            }

            if(input[i] == input[next])
            {
                sum += parseInt(input[i]);
            }
        }
        res.send("advent of code 1 : " + sum);
    });
}