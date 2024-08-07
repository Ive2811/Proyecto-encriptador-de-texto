document.addEventListener('DOMContentLoaded', function () {
    const entradaTexto = document.getElementById('contenido_entrada_texto');
    const resultadoSalida = document.getElementById('texto_resultado_salida');
    const mensaje = document.getElementById('mensaje');
    const imagenSalida = document.querySelector('.imagen_salida');
    const tituloSalida = document.querySelector('.titulo_salida');
    const textoSalida = document.querySelector('.texto_salida');
    const botonResultadoSalida = document.getElementById('btn_copiar');

    const reglas = [
        { original: 'e', encriptado: 'enter' },
        { original: 'i', encriptado: 'imes' },
        { original: 'a', encriptado: 'ai' },
        { original: 'o', encriptado: 'ober' },
        { original: 'u', encriptado: 'ufat' }
    ];

    const encriptar = (texto) => reglas.reduce((acc, regla) => acc.replace(new RegExp(regla.original, 'g'), regla.encriptado), texto);
    const desencriptar = (texto) => reglas.reduce((acc, regla) => acc.replace(new RegExp(regla.encriptado, 'g'), regla.original), texto);

    const mostrarResultado = (texto) => {
        const esVacio = texto.trim() === "";
        [imagenSalida, tituloSalida, textoSalida].forEach(el => el.style.display = esVacio ? 'block' : 'none');
        [resultadoSalida, botonResultadoSalida].forEach(el => el.style.display = esVacio ? 'none' : 'block');
        resultadoSalida.textContent = texto;
    };

    const mostrarMensaje = (texto, esExito) => {
        mensaje.textContent = texto;
        mensaje.style.display = 'block';
        mensaje.className = esExito ? 'mensaje_correcto' : 'mensaje_error';
        setTimeout(() => mensaje.style.display = 'none', 3000);
    };

    const procesarTexto = (accion) => {
        const texto = entradaTexto.value;
        if (/^[a-z\s]*$/.test(texto)) {
            mostrarResultado(accion(texto));
        } else {
            mostrarMensaje('Solo se permiten letras minúsculas y sin acentos.', false);
        }
    };

    document.getElementById('btn_encriptar').addEventListener('click', () => procesarTexto(encriptar));
    document.getElementById('btn_desencriptar').addEventListener('click', () => procesarTexto(desencriptar));
    document.getElementById('btn_limpiar').addEventListener('click', () => {
        entradaTexto.value = '';
        mostrarResultado('');
    });

    botonResultadoSalida.addEventListener('click', () => {
        navigator.clipboard.writeText(resultadoSalida.textContent).then(() => mostrarMensaje('Texto copiado al portapapeles', true));
    });

    // Limpiamos los campos y mensajes al cargar la página
    entradaTexto.value = '';
    mostrarResultado('');
});
