// Variables
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Campos
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-email');
const spinner = document.querySelector('#spinner');

// Para comprobacion de email (Expresion regular)
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Eventos
eventListeners(); 
function eventListeners () {
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // BotonReset
    btnReset.addEventListener('click', resetFormulario);

    // Boton de enviar en el submit
    formulario.addEventListener ('submit', enviarEmail);
}

function iniciarApp() {
    btnEnviar.classList.add('btnDisabled');
    btnEnviar.disabled = true;
}

function validarFormulario(e) {
    // Validacion general
    if(e.target.value.length > 0) {
        const error = document.querySelector('.cartel');
        if(error) {
            error.remove();
        }
        e.target.classList.remove('error');
        e.target.classList.add('success');
    } else {
        e.target.classList.remove('success');
        e.target.classList.add('error');
        mostrarError('Todos los campos son obligatorios');
    }


    // Validacion del email
    if(e.target.type === 'email') {
        if(er.test(e.target.value)) {
            const error = document.querySelector('.cartel');
            if(error) {
                error.remove();
            }
            e.target.classList.remove('error');
            e.target.classList.add('success');
        } else {
            e.target.classList.remove('success');
            e.target.classList.add('error');
            mostrarError('Email no valido');
        }
    }

    // Habilitar el boton de enviar si esta todo bien
    if (er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
        // Con esto habilitamos el boton
        btnEnviar.classList.remove ('btnDisabled');
        btnEnviar.disabled = false; 
        btnEnviar.style.cursor = 'pointer';
    }
}

// Cartel de la validacion
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('mensajeError', 'cartel');

    const errores = document.querySelectorAll('.cartel');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

// Reset Formulario
function resetFormulario(e) {
    formulario.reset();
    e.preventDefault();
    email.classList.remove('success', 'error');
    asunto.classList.remove('success', 'error');
    mensaje.classList.remove('success', 'error');
}

function enviarEmail(e) {
    e.preventDefault();
 
    // spinner al presionar enviar
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        // Cartel
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add ('mensajeEnviado');
        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 5000);
    }, 3000);
}

// Resetear despues del envio
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
    email.classList.remove('success', 'error');
    asunto.classList.remove('success', 'error');
    mensaje.classList.remove('success', 'error');
    btnEnviar.style.cursor = 'not-allowed';
}