function SelectionSort(canvasId, sortButtonId, restartButtonId) {
    // Call the parent constructor
    SortDemo.call(this);
    REGISTER.sel_demo = this;
    REGISTER.sel_demo.init(canvasId, sortButtonId, restartButtonId);
}
// inherit SortDemo
SelectionSort.prototype = Object.create(SortDemo.prototype);

// correct the constructor pointer because it points to SortDemo
SelectionSort.prototype.constructor = SelectionSort;

SelectionSort.prototype.draw = function() {
    var that_sel = REGISTER.sel_demo;
    that_sel.dracula = setTimeout(function() {
        if (that_sel.ui.flags.pause === false) {
            clearTimeout(that_sel.dracula);
            cancelAnimationFrame(that_sel.reQ);
            that_sel.ui.buttons.sort.addEventListener('click', that_sel.draw, false);
            return;
        }
        that_sel.reQ = requestAnimationFrame(that_sel.draw);
        if (that_sel.index > that_sel.list.length && that_sel.index < that_sel.list.length + 3) {
            clearTimeout(that_sel.dracula);
            cancelAnimationFrame(that_sel.reQ);
            that_sel.ui.buttons.sort.addEventListener('click', that_sel.draw, false);
            return;
        }
        if (that_sel.sFlip) {
            that_sel.value = that_sel.index;
            that_sel.sIndex = that_sel.index + 1;
            that_sel.sFlip = false;
        }
        if (that_sel.sIndex < that_sel.list.length) {
            if (that_sel.list[that_sel.sIndex] < that_sel.list[that_sel.value]) {
                that_sel.value = that_sel.sIndex;
            }
            that_sel.reDraw(that_sel.ctx, that_sel.list, that_sel.bars, that_sel.index, that_sel.sIndex, that_sel.W, that_sel.H);
            return that_sel.sIndex++;
        } else {
            that_sel.sFlip = true;
        }
        if (that_sel.index != that_sel.value) {
            that_sel.swap(that_sel.list, that_sel.index, that_sel.value);
        }

        that_sel.list[that_sel.sIndex + 1] = that_sel.value;
        that_sel.reDraw(that_sel.ctx, that_sel.list, that_sel.bars, that_sel.index, that_sel.sIndex, that_sel.W, that_sel.H);
        that_sel.index++;

    }, 1000 / that_sel.fps);
    that_sel.dracula;
}