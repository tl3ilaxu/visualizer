function Cell(x, y) {
    this.padding = 0;
    this.size = cellSize;
    this.x = x * cellSize;
    this.y = y * cellSize;
    this.walls = [true, true, true, true];
    this.offs = [
        [this.padding, this.padding, this.size - 1, this.padding],
        [this.padding, this.padding, this.padding, this.size - 1],
        [this.padding, this.size - 1, this.size - 1, this.size - 1],
        [this.size - 1, this.padding, this.size - 1, this.size - 1]
    ];
    this.visited = false;

    this.draw = function() {
        noStroke();
        if (this.visited) {
            //fill(85, 10, 85, 255);
            fill(171, 93, 238, 255);
            rect(this.x, this.y, this.size, this.size);
            //stroke(13, 108, 13, 255);
            stroke(29, 221, 51, 255);
            for (var i = 0; i < this.walls.length; i++) {
                if (this.walls[i]) {
                    line(this.x + this.offs[i][0], this.y + this.offs[i][1], this.x + this.offs[i][2], this.y + this.offs[i][3]);
                }
            }
        }
    }

    this.visit = function(dir) {
        if (dir === -1){
            return;
        }
        this.visited = true;
        this.walls[dir] = false;
    }

}
