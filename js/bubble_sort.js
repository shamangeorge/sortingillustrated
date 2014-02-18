function BubbleSort(canvasId, sortButtonId, restartButtonId) {
    // Call the parent constructor
    SortDemo.call(this);
    REGISTER.bub_demo = this;
    REGISTER.bub_demo.init(canvasId, sortButtonId, restartButtonId);
}
// inherit SortDemo
BubbleSort.prototype = Object.create(SortDemo.prototype);

// correct the constructor pointer because it points to SortDemo
BubbleSort.prototype.constructor = SelectionSort;

BubbleSort.prototype.draw = function() {
    var that_bubble = REGISTER.bub_demo;
    that_bubble.dracula = setTimeout(function() {
        if (that_bubble.ui.flags.pause === false) {
            clearTimeout(that_bubble.dracula);
            cancelAnimationFrame(that_bubble.reQ);
            that_bubble.ui.buttons.sort.addEventListener('click', that_bubble.draw, false);
            return;
        }
        that_bubble.reQ = requestAnimationFrame(that_bubble.draw);
        if (that_bubble.index > that_bubble.list.length && that_bubble.index < that_bubble.list.length + 3) {
            clearTimeout(that_bubble.dracula);
            cancelAnimationFrame(that_bubble.reQ);
            that_bubble.ui.buttons.sort.addEventListener('click', that_bubble.draw, false);
            return;
        }
        if (that_bubble.sFlip) {
            that_bubble.sIndex = 0;
            that_bubble.sFlip = false;
        }
        if (that_bubble.sIndex < that_bubble.list.length - 1) {
            if (that_bubble.list[that_bubble.sIndex] > that_bubble.list[that_bubble.sIndex + 1]) {
                that_bubble.swap(that_bubble.list, that_bubble.sIndex, that_bubble.sIndex + 1);
            }
            that_bubble.reDraw(that_bubble.ctx, that_bubble.list, that_bubble.bars, that_bubble.index, that_bubble.sIndex, that_bubble.W, that_bubble.H);
            return that_bubble.sIndex++;
        } else {
            that_bubble.sFlip = true;
        }
        that_bubble.reDraw(that_bubble.ctx, that_bubble.list, that_bubble.bars, that_bubble.index, that_bubble.sIndex, that_bubble.W, that_bubble.H);
        that_bubble.index++;

    }, 1000 / that_bubble.fps);
    that_bubble.dracula;
}