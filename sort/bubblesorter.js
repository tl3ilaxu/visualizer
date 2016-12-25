function BubbleSorter(items) {
    sort = new SelectionSorter(items);
    sort.endIndex = items.length - 1;
    sort.update = function() {
        if (this.swapping) {
            if (this.safeItems[this.swap1].moveUp() & this.safeItems[this.swap2].moveUp()) {
                temp = this.safeItems[this.swap1].value;
                this.items[this.swap1] = this.items[this.swap2];
                this.items[this.swap2] = temp;
                this.reset();
                for (var i = this.endIndex + 1; i < this.safeItems.length; i++) {
                    this.safeItems[i].mark();
                }
                this.swapping = false;
                this.step++;
            }

        } else {
            this.smallestIndex = this.iter;
            this.outerIter = this.iter + 1;
            if (this.endIndex <= 0) {
                return;
            }
            current = this.safeItems[this.iter];
            current.select();
            current2 = this.safeItems[this.outerIter];
            current2.select();
            this.step++;
            if (current.value > current2.value) {
                this.swap();
            }
            this.iter++;
            if (this.outerIter >= this.endIndex) {
                this.safeItems[this.endIndex].mark();
                this.endIndex--;
                this.iter = 0;
            }
        }
    }
    return sort;

}
