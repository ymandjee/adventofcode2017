module.exports = function (app) {
    app.post('/6a', function (req, res) {
        var input = req.body.split('\t');
        var count = 0;
        var state = input.toString();
        var states = [];
        while(!states.find(x => x === state)) {
            states.push(state);
            var max = 0;
            var index = 0;
            for(var i = 0; i < input.length; ++i){
                var value = parseInt(input[i]);
                if(value > max){
                    max = value;
                    index = i;
                }
                input[i] = value;
            }
            input[index] = 0;
            while(max > 0){
                index++;
                if(index == input.length){
                    index = 0;
                }
                input[index]++;
                max--;
            }
            state = input.toString();
            count++;
            console.log(state);
        }

        res.send("advent of code 6a : " + count);
    });

    app.post('/6b', function (req, res) {
        var input = req.body.split('\t');
        var count = 0;
        var state = input.toString();
        var states = [];
        while(!states.find(x => x === state)) {
            states.push(state);
            var max = 0;
            var index = 0;
            for(var i = 0; i < input.length; ++i){
                var value = parseInt(input[i]);
                if(value > max){
                    max = value;
                    index = i;
                }
                input[i] = value;
            }
            input[index] = 0;
            while(max > 0){
                index++;
                if(index == input.length){
                    index = 0;
                }
                input[index]++;
                max--;
            }
            state = input.toString();
            count++;
            console.log(state);
        }

        console.log("Checking loop size");
        var loopStates = [];
        count = 0;
        while(!loopStates.find(x => x === state)) {
            loopStates.push(state);
            var max = 0;
            var index = 0;
            for(var i = 0; i < input.length; ++i){
                var value = parseInt(input[i]);
                if(value > max){
                    max = value;
                    index = i;
                }
                input[i] = value;
            }
            input[index] = 0;
            while(max > 0){
                index++;
                if(index == input.length){
                    index = 0;
                }
                input[index]++;
                max--;
            }
            state = input.toString();
            count++;
            console.log(state);
        }

        res.send("advent of code 6b : " + count);
    });
}