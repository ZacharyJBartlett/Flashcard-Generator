var inquirer = require('inquirer');
var flashCards = require('./FlashCards.js');
var questions = require('./questions.js').questions;

var easyQuestions = [];

for (var i = 0; i < questions.length; i++) {
    var first = new flashCards.easyQuestion(questions[i].full);
    easyQuestions.push(first);
}
// console.log(easyQuestions);

var list = 0;
var correct = 0;
var wrong = 0;

askQuestion = function() {
    inquirer.prompt([{
        type: 'input',
        message: easyQuestions[list].front,
        name: 'start'
    }]).then(function(user) {
        if (user.start === "true") {
            console.log('correct');
            correct++;
        } else {
            console.log('nope');
            wrong++;
        }
        if (list < easyQuestions.length - 1) {
            list++;
            askQuestion();
        } else {
            console.log('The End');
            console.log('How many you got right: ' + correct);
            console.log('How many times you failed at simple trivia: ' + wrong);


            inquirer.prompt([{
                type: 'confirm',
                message: 'Another round?',
                name: 'lap2'
            }]).then(function(user) {
                if (user.lap2) {
                    // Reset the game
                    list = 0;
                    correct = 0;
                    wrong = 0;

                    // Begin asking the questions!
                    askQuestion();
                } else {
                    console.log("No Game No Life.")
                }
            })
        }

    })
};
askQuestion();