// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
// Register that keeps global flags
// values and object scope reference
// so they are not floating around
// WE are solely responsible for this
var that_ins; //Global Insertion Demo object reference
var that_sel; //Global Selection Demo object reference
var that_bubble; //Global Bubble Demo object reference
var REGISTER = {
    ins_demo: that_ins,
    sel_demo: that_sel,
    bub_demo: that_bubble
}
var WIDTH = 200;
var HEIGHT = 210;
var FPS = 60;
var SAMPLES_NO = 30;
var INTERVAL = HEIGHT / SAMPLES_NO;
var BAR_HEIGHT = INTERVAL - 3 * INTERVAL / 5;
var LIST = new Float64Array(SAMPLES_NO);
for (var i = 0; i < LIST.length; i++) {
    LIST[i] = Pyth.randomInt(0, WIDTH);
}
//Our Bars

function Bar(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
};

Bar.prototype.draw = function(ctx) {
    ctx.fillRect(this.x, this.y, this.w, this.h);
};

function SortDemo() {
    var scope = this;
}
SortDemo.prototype.init = function(canvasId, sortButtonId, restartButtonId) {
    var scope = this;
    scope.ui = {
        canvas: document.getElementById(canvasId),
        buttons: {
            sort: document.getElementById(sortButtonId),
            restart: document.getElementById(restartButtonId),
        },
        flags: {
            pause: false,
        }
    }
    scope.fps = FPS;
    scope.ctx = scope.ui.canvas.getContext('2d');
    scope.ui.canvas.width = WIDTH;
    scope.ui.canvas.height = HEIGHT;
    scope.W = scope.ui.canvas.width;
    scope.H = scope.ui.canvas.height;
    scope.N = SAMPLES_NO;
    scope.list = new Float64Array(scope.N);
    scope.bars = [];
    scope.index = 0;
    scope.sIndex = 0;
    scope.sFlip = true;
    scope.value = 0;
    for (var i = 0; i < scope.list.length; i++) {
        scope.list[i] = LIST[i];
        var bar = new Bar(0, (i + 1) * scope.H / scope.N, scope.list[i], BAR_HEIGHT);
        scope.bars.push(bar);
        bar.draw(scope.ctx);
    }
    scope.ui.buttons.sort.addEventListener('click', function(e) {
        scope.ui.flags.pause = !scope.ui.flags.pause;
        if (scope.ui.flags.pause === true) {
            scope.innerHTML = 'Pause';
        } else {
            if (scope.index > scope.list.length && scope.index < scope.list.length + 3) {
                scope.innerHTML = 'Sort Us';
            } else {
                scope.innerHTML = 'Continue';
            }
        }
    }, false);
    scope.ui.buttons.restart.addEventListener('click', function(e) {
        scope.restart();
        scope.ui.buttons.sort.innerHTML = 'Sort Us';
    }, false);
    console.log(scope.list)
    scope.draw();
}
SortDemo.prototype.restart = function() {
    var scope = this;
    clearTimeout(scope.dracula);
    cancelAnimationFrame(scope.reQ);
    scope.ctx.clearRect(0, 0, scope.W, scope.H);
    scope.ctx.fillStyle = 'black';
    scope.N = SAMPLES_NO;
    scope.list = new Float64Array(scope.N);
    scope.bars = [];
    scope.index = 0;
    scope.sIndex = 0;
    scope.sFlip = true;
    scope.value = 0;
    for (var i = 0; i < scope.list.length; i++) {
        scope.list[i] = LIST[i];
        var bar = new Bar(0, (i + 1) * scope.H / scope.N, scope.list[i], BAR_HEIGHT);
        scope.bars.push(bar);
        bar.draw(scope.ctx);
    }
}
SortDemo.prototype.reDraw = function(ctx, list, bars, ind1, ind2, W, H) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < list.length; i++) {
        var bar = new Bar(0, (i + 1) * H / list.length, list[i], BAR_HEIGHT);
        bars[i] = bar;
        if (i === ind1) {
            ctx.fillStyle = 'red';
        } else if (i === ind2) {
            ctx.fillStyle = 'limegreen';
        } else {
            ctx.fillStyle = 'black';
        }
        bar.draw(ctx);
    }
}
SortDemo.prototype.swap = function(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}