var sorter;
var elementsLabel;
var elements;
var stepsLabel;
var steps;
var sel;

function setup() {
    createCanvas(800, 800);
    frameRate(60);
    list = [];
    elements = 30;
    for (var i = 0; i < elements; i++) {
        list.push(floor(random(0, elements)));
    }
    sorter = new SelectionSorter(list);
    sorter.x = 800/2 - sorter.width/2;
    sorter.reset();
    elementsLabel = new ListItem("Elements: " + elements, 5, 30);
    stepsLabel = new ListItem("Step: ", 800 - 200, 30);
    steps = new ListItem(0, 800 - 200 + textWidth("Step: "), 30);
    sel = createSelect();
    sel.option("Selection sort");
    sel.option("Bubble sort");
    sel.changed(changeSort);
}

function draw() {
    background(55);
    sorter.update();
    sorter.draw();
    elementsLabel.draw();
    stepsLabel.draw();
    steps.value = sorter.step;
    steps.draw();

}

function changeSort() {
    list = [];
    for (var i = 0; i < elements; i++) {
        list.push(floor(random(0, elements)));
    }
    if (sel.value() == "Selection sort") {
        sorter = new SelectionSorter(list);
    }else if (sel.value() == "Bubble sort"){
        sorter = new BubbleSorter(list);
    }
    sorter.x = 800/2 - sorter.width/2;
    sorter.reset();
}
