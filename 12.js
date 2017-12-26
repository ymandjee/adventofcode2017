module.exports = function (app) {
    app.post('/12a', function (req, res) {
        var inputs = req.body.split('\n');
        var relations = {};
        inputs.forEach(function (input) {
            var programs = input.split(" <-> ");
            relations[programs[0]] = programs[1].split(', ');
        }, this);

        var group = [];
        var participant = 0;
        for (var program in relations) {
            if (isConnected(program, participant, relations, [])) {
                group.push(program);
            }
        }
        console.log(group);
        res.send("advent of code 12a : " + group.length.toString());
    });

    app.post('/12b', function (req, res) {
        var inputs = req.body.split('\n');
        var relations = {};
        inputs.forEach(function (input) {
            var programs = input.split(" <-> ");
            relations[programs[0]] = programs[1].split(', ');
        }, this);

        var checkedPrograms = Object.assign({}, relations);
        var groups = 0;

        while (checkRequired(checkedPrograms)) {
            var participant = getFirstProgram(checkedPrograms);
            for (var program in relations) {
                if (isConnected(program, participant, relations, [])) {
                    checkedPrograms[program] = null;
                }
            }
            groups++;
        }
        res.send("advent of code 12b : " + groups);
    });
}

function isConnected(index, target, tree, visited) {
    if (index == target) return index;
    visited.push(index);
    for (var i = 0; i < tree[index].length; ++i) {
        if (tree[index][i] != index && !visited.includes(tree[index][i]) && isConnected(tree[index][i], target, tree, visited)) {
            return true;
        }
    }
    return false;
}

function checkRequired(obj) {
    for (prop in obj) {
        if (obj[prop] != null) return true;
    }
    return false;
}

function getFirstProgram(obj) {
    for (prop in obj) {
        if (obj[prop] != null) return prop;
    }
    return null;
}