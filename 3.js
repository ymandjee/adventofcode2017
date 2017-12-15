module.exports = function (app) {
    /* Find the nearest square and count the steps from there */
    app.post('/3a', function (req, res) {
        var input = parseInt(req.body);
        console.log("Input : " + input);
        if (input == 1) {
            res.send("advent of code 3a : tricky 1 !");
        }
        //find the corresponding square
        var square = 1;
        var root = 1;
        while (input > square) {
            root += 2;
            square = root * root;
        }
        //Adjust root and square
        root -= 2;
        square = root * root;
        console.log("Root : " + root);
        console.log("Square : " + square);
        var offset = input - square;
        while (input > square) {
            input -= (root + 1);
        }
        //Adjust input
        if (input < square) {
            input += (root + 1);
        }
        console.log("Counting steps from : " + input);

        var axisOffset = ((root + 1) / 2);
        var axis = square + axisOffset;
        console.log("Axis located at : " + axis);

        var steps = Math.abs(input - axis) + ((root + 1) / 2);
        res.send("advent of code 3a : " + steps);
    });

    /* Build the matrix until go over the input */
    app.post('/3b', function (req, res) {
        var input = parseInt(req.body);
        var result = 0;
        var matrix = [];
        var ptr = [0, 0];
        matrix.push({ coord: [0, 0], value: 1 });
        while (result < input) {
            ptr = nextPtr(ptr);
            var value = sumAdjacent(ptr, matrix);
            var tile = { coord: ptr, value: value };
            console.log("Inserting %d at %s", tile.value, tile.coord);
            matrix.push(tile);
            result = value;
        }

        res.send("advent of code 3b : " + value);
    });
}

function sumAdjacent(ptr, matrix) {
    var value = 0;
    var up = matrix.find(x => x.coord[0] == ptr[0] && x.coord[1] == ptr[1] + 1);
    var upleft = matrix.find(x => x.coord[0] == ptr[0] - 1 && x.coord[1] == ptr[1] + 1);
    var left = matrix.find(x => x.coord[0] == ptr[0] - 1 && x.coord[1] == ptr[1]);
    var btmleft = matrix.find(x => x.coord[0] == ptr[0] - 1 && x.coord[1] == ptr[1] - 1);
    var btm = matrix.find(x => x.coord[0] == ptr[0] && x.coord[1] == ptr[1] - 1);
    var btmright = matrix.find(x => x.coord[0] == ptr[0] + 1 && x.coord[1] == ptr[1] - 1);
    var right = matrix.find(x => x.coord[0] == ptr[0] + 1 && x.coord[1] == ptr[1]);
    var upright = matrix.find(x => x.coord[0] == ptr[0] + 1 && x.coord[1] == ptr[1] + 1);

    if (up) value += up.value;
    if (upleft) value += upleft.value;
    if (left) value += left.value;
    if (btmleft) value += btmleft.value;
    if (btm) value += btm.value;
    if (btmright) value += btmright.value;
    if (right) value += right.value;
    if (upright) value += upright.value;

    return value;
}

function nextPtr(ptr) {
    var absX = Math.abs(ptr[0]);
    var absY = Math.abs(ptr[1]);
    var corner = absX == absY;
    if (corner) {

        //Top right, then go left
        if (ptr[0] > 0 & ptr[1] > 0) return [ptr[0] - 1, ptr[1]];

        //Top left, then go down
        if (ptr[0] < 0 & ptr[1] > 0) return [ptr[0], ptr[1] - 1];

        //Bottom left, then go right (manage (0,0))
        if (ptr[0] <= 0 & ptr[1] <= 0) return [ptr[0] + 1, ptr[1]];

        //Bottom right, then go right
        if (ptr[0] > 0 & ptr[1] < 0) return [ptr[0] + 1, ptr[1]];
    }

    //Go up
    if (ptr[0] > ptr[1] && absX  > absY && ptr[0] >  0) return [ptr[0], ptr[1] + 1];

    //Go left
    if (ptr[0] < ptr[1] && absX  < absY && ptr[1] > 0) return [ptr[0] - 1, ptr[1]];

    //Go down
    if (ptr[0] < ptr[1] && absX  > absY && ptr[0] < 0) return [ptr[0], ptr[1] - 1];

    //Go right
    if (ptr[0] > ptr[1] && absX  > absY && ptr[1] < 0) return [ptr[0] + 1, ptr[1]];
}