"use strict";
const period = 2000;

let TxtType = function (el, list) {
    this.list = list;
    this.el = el;
    this.i = 0;
    this.txt = "";
    this.isDeleting = false;
    this.tick();
};

TxtType.prototype.tick = function () {

    let fullTxt = this.list[this.i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.textContent = this.txt + "▏";

    let delta = 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (this.txt.length >= fullTxt.length) {
        this.blink();
        this.isDeleting = true;
        delta = period;
    } else if (this.txt.length === 0) {
        this.isDeleting = false;
        this.i += 1;
        this.i %= this.list.length;
        delta = 500;
    }

    setTimeout(() => {
        this.tick();
    }, delta);
};

TxtType.prototype.blink = function () {
    if (this.txt.length === this.list[this.i].length) {
        if (this.el.textContent.slice(-1) === "▏") {
            this.el.textContent = this.txt + " ";
        } else {
            this.el.textContent = this.txt + "▏"
        }
        setTimeout(() => {
            this.blink();
        }, 500);
    }
}


function init() {
    let elements = document.getElementsByClassName("type-animation");
    for (let elem of elements) {
        let list = JSON.parse(elem.getAttribute("data-text")) || ["data-text attribute not found in element"];
        if (list) {
            new TxtType(elem, list);
        }
    }
};


document.addEventListener('DOMContentLoaded', init, { once: true });