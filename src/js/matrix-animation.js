"use strict";
const tileSize = 20;
const fadeRate = 40;
const agentQuantity = 50;
const message = "Welcome to my website, I'm glad you're here! ";

let Matrix = function (canvas) {
    this.canvas = canvas;

    canvas.width = window.innerWidth * 1;
    canvas.height = window.innerHeight * 1;

    this.ctx = canvas.getContext('2d');
    this.ctx.font = (tileSize - 2) + "px monospace";

    this.maxStackHeight = Math.floor(canvas.height / tileSize) - 1;

    let columnCount = Math.floor(canvas.width / tileSize);

    this.columns = Array.from({length: columnCount}, () => Math.floor(Math.random() * this.maxStackHeight));

    // start the main loop
    this.draw();
}


Matrix.prototype.draw = function () {

    // draw a semi transparent black rectangle on top of the scene to slowly fade older characters
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = "rgba( 0 , 0 , 0 , " + fadeRate / this.canvas.height + " )";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'source-over';

    for (let i = 0; i < this.columns.length; i++) {

        let color = (0.1 * Date.now() + 5000 * i / this.canvas.width) % 360;
        this.ctx.fillStyle = 'hsl(' + color + ', 100%, 60%)';

        let messageI = (this.columns[i] * this.columns.length + i) % message.length

        let chosenChar = message.charAt(messageI);
        //let chosenChar = String.fromCharCode(33 + Math.floor(Math.random() * 94));

        let x = i * tileSize;
        let y = ((this.columns[i] + 1) * tileSize);
        this.ctx.fillText(chosenChar, x, y);
    
        this.columns[i] += 1;
        if (this.columns[i] >= this.maxStackHeight) {
            this.columns[i] = 0;
        }
    }

    setTimeout(() => {
        this.draw();
    }, 50);
}


function init() {
    new Matrix(document.getElementById('matrix-animation'));
}

document.addEventListener('DOMContentLoaded', init, { once: true });