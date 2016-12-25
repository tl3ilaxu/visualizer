function SelectionSorter(items) {
    this.items = items;
    this.safeItems = [];
    this.x = 10;
    this.y = 300;
    this.smallestIndex = 0;
    this.iter = 0;
    this.outerIter = 0;
    this.swapping = false;
    this.padding = 20;
    this.yPadding = 60;
    this.currentRowY = this.y;
    this.maxWidth = 800;
    this.width = 0;
    this.step = 0;

    this.draw = function() {
        for (i in this.safeItems) {
            this.safeItems[i].draw();
            this.safeItems[i].deselect();
        }
    }

    this.swap = function() {
        this.swapping = true;
        this.swap1 = this.outerIter;
        this.swap2 = this.smallestIndex;
    }

    this.reset = function() {
        tempX = this.x;
        this.width = tempX;
        this.currentRowY = this.y;
        for (i in this.items) {
            if (tempX + textWidth(items[i]) + this.padding > this.maxWidth) {
                this.currentRowY += this.yPadding;
                tempX = this.x;
            }
            this.safeItems[i] = new ListItem(items[i], tempX, this.currentRowY);
            textSize(26);
            tempX += textWidth(items[i]) + this.padding;
            if (tempX > this.width) {
                this.width = tempX;
            }
        }
        this.width -= this.x;
    }

    this.reset();

    this.update = function() {
        if (this.swapping) {
            if (this.safeItems[this.swap1].moveUp() & this.safeItems[this.swap2].moveUp()) {
                temp = this.safeItems[this.swap1].value;
                this.items[this.swap1] = this.items[this.swap2];
                this.items[this.swap2] = temp;
                this.reset();
                this.swapping = false;
                this.step++;
            }

        } else {
            if (this.outerIter >= this.safeItems.length) {
                return;
            }
            current = this.safeItems[this.iter];
            current.select();
            this.step++;
            if (current.value < this.safeItems[this.smallestIndex].value) {
                this.safeItems[this.smallestIndex].unMark();
                this.smallestIndex = this.iter;
                current.mark();
            }
            this.iter++;
            if (this.iter >= this.safeItems.length) {
                this.swap();
                this.outerIter++;
                this.iter = this.outerIter;
                this.smallestIndex = this.iter;
            }
        }
    }
}
