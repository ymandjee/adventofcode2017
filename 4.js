module.exports = function (app) {
    app.post('/4a', function (req, res) {
        var phrases = req.body.split('\n');
        var unsafe = [];
        phrases.forEach(function (phrase) {
            if (phrase) {
                var words = phrase.split(' ');
                var appearances = {};
                var legit = true;
                words.forEach(function (word) {
                    if (word) {
                        if (!appearances[word]) {
                            appearances[word] = "ok";
                        } else {
                            legit = false;
                        }
                    }
                }, this);
                if (!legit) unsafe.push(phrase);
            }
        }, this);
        res.send("advent of code 4a : " + (phrases.length - unsafe.length));
    });

    app.post('/4b', function (req, res) {
        var phrases = req.body.split('\n');
        var unsafe = [];
        phrases.forEach(function (phrase) {
            if (phrase) {
                var words = phrase.split(' ');
                var appearances = {};
                var legit = true;
                words.forEach(function (word) {
                    if (word) {
                        var newWord = rearrangeWord(word);
                        if (!appearances[newWord]) {
                            appearances[newWord] = "ok";
                        } else {
                            legit = false;
                        }
                    }
                }, this);
                if (!legit) unsafe.push(phrase);
            }
        }, this);
        res.send("advent of code 4b : " + (phrases.length - unsafe.length));
    });
}

function rearrangeWord(input) {
    var chars = input.split('');
    chars.sort();

    var word = "";
    chars.sort();
    chars.forEach(function (element) {
        word += element;
    }, this);

    return word;
}