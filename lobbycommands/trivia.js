

const axios = require('axios');

const triviaQuestions = {
    'en': [
        { question: 'What is the capital of France?', answer: 'Paris' },
        { question: 'What is the largest mammal in the world?', answer: 'Blue whale' },
        { question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' }
    ],
    'es': [
        { question: '¿Cuál es la capital de España?', answer: 'Madrid' },
        { question: '¿Quién pintó "La persistencia de la memoria"?', answer: 'Salvador Dalí' },
        { question: '¿Qué elemento químico tiene el símbolo "H"?', answer: 'Hidrógeno' }
    ]
};

const handleTriviaCommand = async (message, sender) => {
    console.log(`${sender.displayName}: ${message.content}`);

    
    if (!message.content.startsWith('!trivia')) {
        return; 
    }

    
    console.log('Channel type:', typeof message.channel);

   
    if (!message.channel || !message.channel.send) {
        message.reply('Trivia can only be played in text channels.');
        return;
    }

  
    const [, language] = message.content.split(' ');
    const lang = language ? language.toLowerCase() : 'en'; 
    const questions = triviaQuestions[lang];
    if (!questions) {
        message.reply('Invalid language. Please choose "en" for English or "es" for Spanish.');
        return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const { question, answer } = questions[randomIndex];

    
    message.reply(`Question: ${question}`);

    
    const filter = (response) => response.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, time: 15000 }); 

    collector.on('collect', (response) => {
        const userAnswer = response.content.trim().toLowerCase();
        if (userAnswer === answer.toLowerCase()) {
            message.reply('Correct answer! Well done!');
        } else {
            message.reply(`Wrong answer. The correct answer is: ${answer}`);
        }
        collector.stop();
    });

    collector.on('end', (collected, reason) => {
        if (reason === 'time') {
            message.reply(`Time's up! The correct answer is: ${answer}`);
        }
    });
};

module.exports = handleTriviaCommand;
