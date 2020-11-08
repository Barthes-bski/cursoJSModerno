//Variables

const btnEnviar = document.querySelector("#enviar");
const resetBtn = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//Campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", init);

    //Campos
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

    // Limpiar - Resetear
    resetBtn.addEventListener("click", limpiarFormulario);

    // Enviar
    formulario.addEventListener("submit", enviarEmail);


}
//Funciones
function init() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {

    if (e.target.value.length > 0) {
        const error = document.querySelector("p.error");
        if (error) {
            error.remove();
        }
        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("Todos los campos son obligatorios");
    }

    // Validar email
    if (e.target.type === "email") {
        if (er.test(e.target.value)) {
            const error = document.querySelector("p.error");
            if (error) {
                error.remove();
            }
            e.target.classList.remove("border", "border-red-500");
            e.target.classList.add("border", "border-green-500");
        } else {
            e.target.classList.remove("border", "border-green-500");
            e.target.classList.add("border", "border-red-500");
            mostrarError("Email Inválido");
        }
    }

    if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("opacity-50");
        btnEnviar.classList.remove("cursor-not-allowed");
    }
}

function enviarEmail(e) {
    e.preventDefault();

    // Spinner al presionar Enviar
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = 'none';

        const mensaje = document.createElement('p');
        mensaje.textContent = '¡El mensaje fue enviado correctamente!';
        mensaje.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white');

        //Inserta mensaje sobre el spinner
        formulario.insertBefore(mensaje, spinner);

        setTimeout(() => {
            mensaje.remove(); //Elimina mensaje y resetea el formulario
            limpiarFormulario();
        }, 4000);
    }, 3000);
}

function limpiarFormulario() {
    formulario.reset();
    init();
}

function mostrarError(mensaje) {
    const msjError = document.createElement("p");
    msjError.textContent = mensaje;
    msjError.classList.add(
        "border",
        "border-red-500",
        "background-red-100",
        "text-red-500",
        "p-3",
        "mt-5",
        "error"
    );

    const errores = document.querySelectorAll(".error");
    if (errores.length === 0) {
        formulario.appendChild(msjError);
    }
}