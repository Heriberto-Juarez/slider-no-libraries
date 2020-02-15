let domReady = function (callback) {
    let ready = false;

    let detach = function () {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    };
    let completed = function () {
        if (!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };

    if (document.readyState === "complete") {
        callback();
    } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);

        let top = false;

        try {
            top = window.frameElement == null && document.documentElement;
        } catch (e) {
        }

        if (top && top.doScroll) {
            (function scrollCheck() {
                if (ready) return;

                try {
                    top.doScroll("left");
                } catch (e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback();
            })();
        }
    }
};

/**
 * Borrar la función de arriba si ya se tiene el menu de hamburguesa ya que este también tiene la misma función
 * */

domReady(function () {

    //seleccionar los h-sliders
    let sliders = document.querySelectorAll(".h-slider");

    sliders.forEach(function (element) {
        const back = element.querySelector(".back"); // < (botón de regreso)
        const next = element.querySelector(".next"); // > (botón de progreso)
        const elements = element.querySelectorAll(".h-slider-item");

        /**El elemento que tenga la clase "active" es el elemento visible o activo**/
        let active = -1;
        let i = 0;
        elements.forEach(function (e) {
            if (e.classList.contains("active")) {
                active = i;
            }
            i++;
        });
        next.addEventListener("click", function () {
            if(active+1 < elements.length){
                elements[active].classList.remove("active");
                elements[++active].classList.add("active");
            }
        });
        back.addEventListener("click", function () {
            if(active-1 >= 0) {
                elements[active].classList.remove("active");
                elements[--active].classList.add("active");
            }
        });
    });

});