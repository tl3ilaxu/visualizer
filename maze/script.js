var cells = [];
var stack = [];
var cellSize = 20;
var size = 800;
var nrCellsWidth = size / cellSize;
var next;
var offs = [
    [0, 1], // 0
    [1, 0], // 1
    [0, -1], // 2
    [-1, 0] // 3
]

function setup() {
    for (var y = 0; y < nrCellsWidth; y++) {
        for (var x = 0; x < nrCellsWidth; x++) {
            cells[x + y * nrCellsWidth] = new Cell(x, y);
        }
    }
    createCanvas(800, 800);
    frameRate(30);
    next = [0, 0, 0];
}

function draw() {
    background(55);
    for (var i = 0; i < cells.length; i++) {
        cells[i].draw();
    }
    if (next) {
        fill(148, 255, 134);
        rect(next[0] * cellSize, next[1] * cellSize, cellSize, cellSize);
        visit(next[0], next[1], next[2]);
    }
}

function visit(x, y, dir) {
    var pos = x + y * nrCellsWidth;
    if (inRange(x, 0, nrCellsWidth) && inRange(y, 0, nrCellsWidth)) {
        var curr = cells[pos];
        curr.visit(dir);
        var freeNeighbours = [];
        for (var i = 0; i < 4; i++) {
            var nx = x + offs[i][0];
            var ny = y + offs[i][1];
            if (cellAccessable(nx, ny)) {
                freeNeighbours.push([nx, ny, i]);
            }
        }
        if (freeNeighbours.length == 0) {
            next = stack.pop();
            return;
        }
        stack.push([x, y, -1]);
        var ndir = Math.round(Math.random() * (freeNeighbours.length - 1));
        curr.visit((freeNeighbours[ndir][2] + 2) % 4);
        next = [freeNeighbours[ndir][0], freeNeighbours[ndir][1], freeNeighbours[ndir][2]];
    }
}

function cellAccessable(x, y) {
    return inRange(x, 0, nrCellsWidth) && inRange(y, 0, nrCellsWidth) && !cells[x + y * nrCellsWidth].visited
}

function inRange(i, left, right) {
    return i >= left && i < right;
}
