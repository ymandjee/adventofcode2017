module.exports = function (app) {
    app.post('/7a', function (req, res) {
        var input = req.body.split('\n');
        var data = parseInput(input);
        var root = findRoot(data[0], data, 0);
        res.send("advent of code 7a : " + root.name);
    });

    app.post('/7b', function (req, res) {
        var input = req.body.split('\n');
        var data = parseInput(input);
        var root = findRoot(data[0], data, 0);
        var node = findUnbalanced(root, data);
        var message = "advent of code 7b : node " + node.name + "(" + node.id.toString()
            + ") offset is " + (node.expectedWeight - node.weight).toString();
        node.children.forEach(function (childName) {
            var child = data.find(x => x.name === childName);
            message += "     " + child.name + "(" + child.id + ") weights " + child.weight;
        }, this);
        res.send(message);
    });
}

function parseInput(input) {
    var data = [];
    input.forEach(function (element) {
        if (element) {
            var name = element.substring(0, element.indexOf(' ('));
            var id = element.substring(element.indexOf('(') + 1, element.indexOf(')'));

            var program = { name: name, id: parseInt(id), children: null };

            var split = element.split('->');
            if (split.length == 2) {
                //Composite
                var children = split[1].split(',');
                var trimmed = [];
                children.forEach(function (child) {
                    trimmed.push(child.trim());
                }, this);
                program.children = trimmed;
            }

            data.push(program);
        }
    }, this);
    return data;
}

function findRoot(node, tree, index) {
    if (node.children) {
        var parent = tree.find(x => x.children && x.children.includes(node.name))
        if (parent) {
            return findRoot(parent, tree, index);
        } else {
            return node;
        }
    } else {
        var next = ++index;
        if (next < tree.length) {
            return findRoot(tree[next], tree, next);
        }
        return null;
    }
}

function findUnbalanced(node, tree) {
    if (node.children) {
        var imbalancedChild = null;
        var childrenWeight = 0;
        var lastChild = null;
        node.children.forEach(function (childName) {
            if (!imbalancedChild) {
                var child = tree.find(x => x.name === childName);
                imbalancedChild = findUnbalanced(child, tree);
                childrenWeight += child.weight;
                lastChild = child;
            }
        }, this);
        if (imbalancedChild) return imbalancedChild;

        var expectedWeight = node.id + lastChild.weight * node.children.length;
        node.weight = node.id + childrenWeight;

        if (node.weight != expectedWeight) {
            node.expectedWeight = expectedWeight;
            return node;
        }
        return null;
    }
    else {
        node.weight = node.id;
        return null;
    }
}