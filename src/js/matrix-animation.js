"use strict";
const tileSize = 20;
const fadeRate = 40;
const width = 1;
const font = "Share Tech Mono";
const text = "Welcome to my website, I'm glad you're here! ";

const globalMousePos = { x: 0, y: 0 };

let Matrix = function (canvas) {
    this.canvas = canvas;

    canvas.width = window.innerWidth * width;

    // track mouse
    canvas.addEventListener("mousemove", (event) => {
        globalMousePos.x = event.clientX;
        globalMousePos.y = event.clientY;
    }, { passive: true });
    this.mouseOver = false;
    canvas.addEventListener("mouseleave", (event) => {
        this.mouseOver = false
    }, { passive: true });
    canvas.addEventListener("mouseover", (event) => {
        this.mouseOver = true
    }, { passive: true });


    this.ctx = canvas.getContext('2d');
    this.ctx.font = "bold " + (tileSize - 2) + "px '" + font + "', monospace";

    // height and width in tiles
    this.maxStackHeight = Math.floor(canvas.height / tileSize);
    let columnCount = Math.floor(canvas.width / tileSize);

    // stores the height of the active letter in each column
    this.columns = Array.from({ length: columnCount }, () => Math.floor(Math.random() * this.maxStackHeight));

    // start the main loop
    this.draw();
}


Matrix.prototype.draw = function () {

    // draw a semi transparent black rectangle on top of the scene to slowly fade older characters
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = "rgb(0 0 0 / " + fadeRate / this.canvas.height + ")";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'source-over';


    // loop through each column
    for (let i = 0; i < this.columns.length; i++) {

        // lower the height of the current falling letter
        this.columns[i] += 1;
        this.columns[i] %= this.maxStackHeight;

        // coordinates of the current letter
        let x = i * tileSize;
        let y = ((this.columns[i] + 1) * tileSize);

        // defaults
        let opacity = 100;
        let color = (0.1 * Date.now() + 5000 * i / this.canvas.width) % 360;
        let message = text;

        // make everything green on mouse hover
        if (this.mouseOver) {
            color = 100;
            message = "matrix ";

            // hide letters that are far away from mouse
            let mouse = this.getMousePos();
            let distToMouse = Math.sqrt((mouse.x - x) ** 2 + (mouse.y - y) ** 2);
            if (distToMouse > 0.15 * this.canvas.width) {
                opacity = 0;
            }
        }

        this.ctx.fillStyle = 'hsl(' + color + ' 100% 60% / ' + opacity + '%)';

        let chosenChar = message.charAt((this.columns[i] * this.columns.length + i) % message.length);

        this.ctx.fillText(chosenChar, x, y);
    }

    setTimeout(() => {
        this.draw();
    }, 50);
}

Matrix.prototype.getMousePos = function () {
    let rect = this.canvas.getBoundingClientRect();
    return {
        x: (globalMousePos.x - rect.left) / (rect.right - rect.left) * this.canvas.width,
        y: (globalMousePos.y - rect.top) / (rect.bottom - rect.top) * this.canvas.height
    };
}

document.addEventListener('DOMContentLoaded', () => {
    new Matrix(document.getElementById('matrix-animation'));
}, { once: true });