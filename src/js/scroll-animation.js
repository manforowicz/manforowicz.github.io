"use strict";
let elements;
let reverseElements;

function init() {
    elements = document.getElementsByClassName("scroll-animation");
    reverseElements = document.getElementsByClassName("scroll-animation-reverse");
    window.addEventListener('scroll', update, { passive: true });
}

function moveElement(el, reverse) {
    let rect = el.getBoundingClientRect();
    let verticalProgress = rect.top / window.innerHeight - 0.5;
    if (reverse) {
        verticalProgress = -verticalProgress;
    }
    let pos = verticalProgress * window.innerWidth;
    el.style.transform = 'translateX(' + pos + 'px)';
}


function update() {
    for (let element of elements) {
        moveElement(element, false);
    }
    for (let element of reverseElements) {
        moveElement(element, true);
    }
}

document.addEventListener('DOMContentLoaded', init, { once: true });
