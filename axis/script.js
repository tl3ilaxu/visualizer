var mouseShape;
var testShape;

function setup() {
    createCanvas(800, 800);
    mouseShape = new Shape(0, 0, 50);
    testShape = new Shape(400, 400);
    frameRate(30);
}

function draw() {
    background(55);
    mouseShape.setPos(mouseX, mouseY);
    mouseShape.draw();
    testShape.draw();
    testShape.collide(mouseShape.pos);
}
