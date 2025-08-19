
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

// REGISTRAR PLUGIN SCROLL
gsap.registerPlugin(ScrollTrigger);

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

        document.querySelector('main').style.display = 'flex';

        /*SECCION INTRO*/
        gsap.from(".bendicion", {
            scrollTrigger: {
                trigger: ".bendicion",
                start: "top 95%",
            },
            x: -500,
            duration: 1.5
        });

        gsap.from(".names-padres", {
            scrollTrigger: {
                trigger: ".names-padres",
                start: "-125px bottom",
            },
            y: 200,
            duration: 1
        });

        gsap.to(".novios > img", {
            scale: 1,
            duration: 1,
            scrollTrigger: {
                trigger: ".novios > img",
                start: "top 95%",
            },
        });

        gsap.from(".names-padrinos, .parrafo-padrinos", {
            scrollTrigger: {
                trigger: ".names-padrinos, .parrafo-padrinos",
                start: "-125px bottom",
            },
            y: 200,
            duration: 1
        });

        gsap.from(".fecha-derecha, .fecha-izquierda", {
            opacity: 0,
            duration: 3,
            scrollTrigger: {
                trigger: ".fecha",
                start: "top 95%",
            },
        });

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


// CARRUCEL DE IMÁGENES

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    /*
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    */
});

// FORMULARIO DE CONFIRMACION DE ASISTENCIA

const URLform = 'https://script.google.com/macros/s/AKfycbyj0ovQnWtfh48dtYiw4mEdKaaw9DOkDieVhHvUf2LhPPfgi809MPahegndfeQFFYJcaw/exec';

const form = document.forms['confirmacion-formulario'];
const dialog = document.getElementById('confirmacion-dialog');
const dialogError = document.getElementById('error-dialog');
const recargar = document.querySelector('.recargar');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(URLform, { method: 'POST', body: new FormData(form) })
        .then(response => dialog.showModal())
        .then(() => recargar.addEventListener('click', () => {
            window.location.reload()
        }))
        .catch(error => dialogError.showModal())
})


