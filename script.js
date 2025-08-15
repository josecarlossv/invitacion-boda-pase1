
// REGISTRAR EFECTO, ANIMACIÓN PARA DESAPARECER
gsap.registerEffect({
    name: "fade",
    effect: (targets, config) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
    },
    defaults: { duration: 0.3 },
    extendTimeline: true,
});

// REGISTRAR EFECTO, ANIMACIÓN PARA APARECER
gsap.registerEffect({
    name: "fadeIn",
    effect: (targets, config) => {
        return gsap.to(targets, { duration: config.duration, opacity: 1 });
    },
    defaults: { duration: 2 },
    extendTimeline: true,
});

// ANIMACIÓN PARA LA CARTA
document.addEventListener('DOMContentLoaded', () => {
    const botonCarta = document.querySelector('.carta-boton');
    const imagenInicial = document.querySelector('.carta-imagen-inicial');

    botonCarta.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
        gsap.effects.fade(botonCarta);

        if (screen.width > 601) {
            gsap.to(".carta-sobre-derecha", { x: 1000, duration: 2.5 });
            gsap.to(".carta-sobre-izquierda", { x: -1200, duration: 2.5 });
        } else {
            gsap.to(".carta-sobre-derecha", { x: 300, duration: 1.5 });
            gsap.to(".carta-sobre-izquierda", { x: -400, duration: 1.5 });
        }

        gsap.effects.fadeIn(imagenInicial);

        setTimeout(() => {
            document.querySelector('main').style.display = 'flex';
        }, 500);

    });
});


// LOGICA DEL CONTADOR

const fechaBoda = new Date(2025, 10, 29, 19, 0, 0).getTime();

let actualizarContador = setInterval(() => {
    let hoy = new Date().getTime();

    // Calculo de los milisegundos entre la fecha de la boda y el dia actual
    let distancia = fechaBoda - hoy;

    // Calculo de dias, horas, minutos y segundos faltantes para la boda
    let dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutos = Math.floor((distancia % (1000 * 60 * 60) / (1000 * 60)));
    let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    if (dias.toString().length < 2) {
        document.querySelector(".contador-dias").innerHTML = "0" + dias + " :";
    } else {
        document.querySelector(".contador-dias").innerHTML = dias + " :";
    }

    if (horas.toString().length < 2) {
        document.querySelector(".contador-horas").innerHTML = "0" + horas + " :";
    } else {
        document.querySelector(".contador-horas").innerHTML = horas + " :";
    }

    if (minutos.toString().length < 2) {
        document.querySelector(".contador-minutos").innerHTML = "0" + minutos + " :";
    } else {
        document.querySelector(".contador-minutos").innerHTML = minutos + " :";
    }

    if (segundos.toString().length < 2) {
        document.querySelector(".contador-segundos").innerHTML = "0" + segundos;
    } else {
        document.querySelector(".contador-segundos").innerHTML = segundos;
    }
}, 1000);