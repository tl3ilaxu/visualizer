function ListItem(value, x, y) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.color = 255;
    this.textSize = 26;
    this.d = 0;
    this.draw = function() {
        push();
        fill(this.color);
        textSize(this.textSize);
        text(this.value, this.x, this.y);
        pop();
    }

    this.select = function() {
        this.selected = true;
        this.color = color(20, 20, 200);
    }

    this.deselect = function() {
        if (this.selected) {
            this.color = 255;
            this.selected = false;
        }
    }

    this.unMark = function() {
        if (this.marked) {
            this.color = 255;
            this.marked = false;
        }
    }

    this.mark = function() {
        this.marked = true;
        this.selected = false;
        this.color = color(29, 221, 51, 255);
    }

    this.moveUp = function() {
        increment = 3;
        this.d += increment;
        if (this.d < 30) {
            this.y += increment;
            return false;
        } else {
            return true;
        }
    }
}
