"use strict";
/*let MyThing = function (elem, txt) {
    this.elem = elem;
    this.txt = txt;
    this.i = 0;
}

MyThing.prototype.write = function () {
    if (this.i < this.txt.length) {
        this.elem.innerHTML += this.txt.charAt(this.i);
        setTimeout(this.write, 50);
    }
}

function typeWriter(id) {
    let elem = document.getElementById(id);
    let txt = elem.innerHTML;
    elem.innerHTML = "";
    //_typeWriter(elem, txt, 0);


    let hello = new MyThing(elem, txt);
    hello.write();
}

function _typeWriter(elem, txt, i) {
    if (i < txt.length) {
        elem.innerHTML += txt.charAt(i);
        setTimeout(_typeWriter, 50, elem, txt, i + 1);
    }
}

*/
//-----------

let TxtType = function (el, list, period) {
    this.list = list;
    this.el = el;
    this.i = 0;
    this.period = period;
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

    this.el.innerHTML = this.txt + "▏";

    let delta = 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (this.txt.length >= fullTxt.length) {
        this.blink();
        this.isDeleting = true;
        delta = this.period;
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
        if (this.el.innerHTML.slice(-1) === "▏") {
            this.el.innerHTML = this.txt;
        } else {
            this.el.innerHTML = this.txt + "▏"
        }
        setTimeout(() => {
            this.blink();
        }, 500);
    }
}



function init() {
    let elements = document.getElementsByClassName("typewrite");
    for (let elem of elements) {
        let list = JSON.parse(elem.getAttribute("data-text"));
        let period = parseInt(elem.getAttribute("data-period"), 10) || 0;
        if (list) {
            new TxtType(elem, list, period);
        }
    }
};


document.addEventListener('DOMContentLoaded', init, { once: true });