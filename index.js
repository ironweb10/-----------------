const { exec } = require('child_process');

let botProcess; // Variable global para almacenar el proceso del bot

// Función para encender el bot
function encenderBot() {
    console.log('Encendiendo el bot...');
    // Ejecuta el archivo bot.js
    botProcess = exec('node bot.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el bot: ${error}`);
            return;
        }
        console.log(`El bot ha sido ejecutado:\n${stdout}`);
        if (stderr) {
            console.error(`Errores del bot:\n${stderr}`);
        }
    });
}

// Función para apagar el bot
function apagarBot() {
    if (botProcess) {
        console.log('Apagando el bot...');
        botProcess.kill(); // Detiene el proceso del bot
    }
}

// Función para volver a encender el bot después de un tiempo
function volverAEncenderBot() {
    console.log('Encendiendo el bot nuevamente...');
    encenderBot();
}

// Encender el bot inicialmente
encenderBot();

// Programar el apagado después de 10 minutos
setTimeout(() => {
    apagarBot();
    // Programar el encendido nuevamente después de 33 segundos
    setTimeout(volverAEncenderBot, 33000); // 33 segundos en milisegundos
}, 600000); // 10 minutos en milisegundos
