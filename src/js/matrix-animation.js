"use strict"
const tileSize = 20;
const fadeFactor = 0.05;

let Matrix = function (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.columns = [];

    this.maxStackHeight = Math.ceil(canvas.height / tileSize);

    // divide the canvas into columns
    for (let i = 0; i < canvas.width / tileSize; i++) {
        let column = {
            x: i * tileSize,
            height: this.maxStackHeight,
        };

        this.columns.push(column);
    }

    // start the main loop
    this.draw();
}


Matrix.prototype.draw = function () {


    // draw a semi transparent black rectangle on top of the scene to slowly fade older characters
    this.ctx.fillStyle = "rgba( 0 , 0 , 0 , " + fadeFactor + " )";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // pick a font slightly smaller than the tile size
    this.ctx.font = (tileSize - 2) + "px monospace";
    this.ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 100%, 80%)';


    for (let i = 0; i < this.columns.length; i++) {

        if (this.columns[i].height < this.maxStackHeight) {
            // pick a random ascii character (change the 94 to a higher number to include more characters)
            var randomCharacter = String.fromCharCode(33 + Math.floor(Math.random() * 94));
            this.ctx.fillText(randomCharacter, this.columns[i].x, this.columns[i].height * tileSize + tileSize);

            this.columns[i].height += 1;
        } else if (Math.random() < 0.1) {
            this.columns[i].height = 0;
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