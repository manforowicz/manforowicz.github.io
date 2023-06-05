let elements;

function init() {
    elements = document.getElementsByClassName("scroll-animation");
    window.addEventListener('scroll', update, { passive: true });
}


function update() {
    for (let element of elements) {
        let progress = (window.innerHeight - element.getBoundingClientRect().bottom) / window.innerHeight;
        let pos = progress * window.innerWidth * 0.8;
        element.style.transform = 'translateX(' + pos + 'px)';
    }
}

document.addEventListener('DOMContentLoaded', init, { once: true });
