module.exports = function (app) {
    app.post('/8a', function (req, res) {
        var input = parseInput(req.body);
        var temp = 0;
        var result = calculate(input, temp);
        var registers = result.registers;
        var max = 0;
        for (var key in registers) {
            var value = registers[key];
            if (value > max) {
                max = registers[key];
            }
        }
        res.send("advent of code 8a : " + max);
    });

    app.post('/8b', function (req, res) {
        var input = parseInput(req.body);
        var max = 0;
        var result = calculate(input, max);
        res.send("advent of code 8b : " + result.max);
    });
}

function parseInput(input) {
    var data = [];
    var instructions = input.split("\n");
    instructions.forEach(function (instruction) {
        var steps = instruction.split(" if ");
        var action = {};
        if (steps[0].includes("inc")) {
            var split = steps[0].split(" inc ");
            action.register = split[0];
            action.value = parseInt(split[1]);
        } else if (steps[0].includes("dec")) {
            var split = steps[0].split(" dec ");
            action.register = split[0];
            action.value = parseInt(split[1]) * -1;
        }

        var split = steps[1].split(" ");
        var condition = {
            register: split[0],
            operator: split[1],
            value: parseInt(split[2])
        }

        data.push({ action: action, condition: condition });
    }, this);
    return data;
}

function calculate(input, max) {
    var registers = {};
    input.forEach(function (instruction) {
        var doAction = false;
        if (!registers[instruction.action.register]) registers[instruction.action.register] = 0;
        if (!registers[instruction.condition.register]) registers[instruction.condition.register] = 0;
        switch (instruction.condition.operator) {
            case "<":
                doAction = registers[instruction.condition.register] < instruction.condition.value;
                break;
            case ">":
                doAction = registers[instruction.condition.register] > instruction.condition.value;
                break;
            case ">=":
                doAction = registers[instruction.condition.register] >= instruction.condition.value;
                break;
            case "<=":
                doAction = registers[instruction.condition.register] <= instruction.condition.value;
                break;
            case "==":
                doAction = registers[instruction.condition.register] == instruction.condition.value;
                break;
            case "!=":
                doAction = registers[instruction.condition.register] != instruction.condition.value;
                break;
            default:
            //nothing to do
        }
        if (doAction) {
            registers[instruction.action.register] += instruction.action.value;
            if (registers[instruction.action.register] > max) {
                max = registers[instruction.action.register];
            }
        }
    }, this);
    return { registers: registers, max: max };
}