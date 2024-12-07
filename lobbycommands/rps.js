// commands/rps.js

const handleRPSCommand = (message, sender) => {
    console.log(`${sender.displayName}: ${message.content}`);

    if (!message.content.startsWith('!rps')) {
        return; 
    }

    
    const [, userChoice] = message.content.split(' ');


    const options = ['rock', 'paper', 'scissors'];

    
    const botChoice = options[Math.floor(Math.random() * options.length)];

   
    let result;
    if (!userChoice || !options.includes(userChoice.toLowerCase())) {
        result = 'Please choose one of the following options: rock, paper, scissors.';
    } else if (userChoice.toLowerCase() === botChoice) {
        result = `It's a tie! Both you and I chose ${userChoice}.`;
    } else if (
        (userChoice.toLowerCase() === 'rock' && botChoice === 'scissors') ||
        (userChoice.toLowerCase() === 'paper' && botChoice === 'rock') ||
        (userChoice.toLowerCase() === 'scissors' && botChoice === 'paper')
    ) {
        result = `You win! ${userChoice} beats ${botChoice}.`;
    } else {
        result = `I win! ${botChoice} beats ${userChoice}.`;
    }

    
    message.reply(result);
};

module.exports = handleRPSCommand;
