function typeWriter(id) {
    let elem = document.getElementById(id);
    let txt = elem.innerHTML;
    elem.innerHTML = "";
    _typeWriter(elem, txt, 0);
}

function _typeWriter(elem, txt, i) {
    if (i < txt.length) {
        elem.innerHTML += txt.charAt(i);
        setTimeout(_typeWriter, 50, elem, txt, i+1);
    }
}
