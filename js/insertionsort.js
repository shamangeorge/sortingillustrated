function InsertionSort(canvasId, sortButtonId, restartButtonId) {
    // Call the parent constructor
    SortDemo.call(this);
    REGISTER.ins_demo = this;
    REGISTER.ins_demo.init(canvasId, sortButtonId, restartButtonId);
}
// inherit SortDemo
InsertionSort.prototype = Object.create(SortDemo.prototype);

// correct the constructor pointer because it points to SortDemo
InsertionSort.prototype.constructor = InsertionSort;

InsertionSort.prototype.draw = function() {
    var that_ins = REGISTER.ins_demo;
    that_ins.dracula = setTimeout(function() {
        if (that_ins.ui.flags.pause === false) {
            clearTimeout(that_ins.dracula);
            cancelAnimationFrame(that_ins.reQ);
            that_ins.ui.buttons.sort.addEventListener('click', that_ins.draw, false);
            return;
        }
        that_ins.reQ = requestAnimationFrame(that_ins.draw);
        if (that_ins.index > that_ins.list.length && that_ins.index < that_ins.list.length + 3) {
            clearTimeout(that_ins.dracula);
            cancelAnimationFrame(that_ins.reQ);
            that_ins.ui.buttons.sort.addEventListener('click', that_ins.draw, false);
            return;
        }
        if (that_ins.sFlip) {
            that_ins.value = that_ins.list[that_ins.index];
            that_ins.sIndex = that_ins.index - 1;
            that_ins.sFlip = false;
        }
        if (that_ins.sIndex > -1 && that_ins.list[that_ins.sIndex] > that_ins.value) {
            that_ins.list[that_ins.sIndex + 1] = that_ins.list[that_ins.sIndex];
            that_ins.reDraw(that_ins.ctx, that_ins.list, that_ins.bars, that_ins.index, that_ins.sIndex, that_ins.W, that_ins.H);
            return that_ins.sIndex--;
        } else {
            that_ins.sFlip = true;
        }

        that_ins.list[that_ins.sIndex + 1] = that_ins.value;
        that_ins.reDraw(that_ins.ctx, that_ins.list, that_ins.bars, that_ins.index, that_ins.sIndex, that_ins.W, that_ins.H);
        that_ins.index++;

    }, 1000 / that_ins.fps);
    that_ins.dracula;
}
