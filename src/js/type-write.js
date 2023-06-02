

/*var MyThing = function (elem, txt) {
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


    var hello = new MyThing(elem, txt);
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

var TxtType = function (el, list, period) {
    this.list = list;
    this.el = el;
    this.i = 0;
    this.period = period;
    this.txt = "";
    this.isDeleting = false;
    this.tick();
};

TxtType.prototype.tick = function () {
    this.i %= this.list.length;
    var fullTxt = this.list[this.i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = this.txt + "▏";

    var delta = 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (this.txt.length === fullTxt.length) {
        this.blink();
        this.isDeleting = true;
        delta = this.period;
    } else if (this.txt.length === 0) {
        this.isDeleting = false;
        this.i++;
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

window.onload = function () {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
        var list = JSON.parse(elements[i].getAttribute("text"));
        var period = parseInt(elements[i].getAttribute("period"), 10);
        if (list) {
            new TxtType(elements[i], list, period);
        }
    }
};


window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  }, false);