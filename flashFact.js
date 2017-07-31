var basicCard = require('./BasicCard.js');
var clozeCard = require('./ClozeCard.js');
var inquirer = require('inquirer');

function firstQuestion() {
  inquirer.prompt([{
    name: 'viewOrAdd',
    message: "What would you like to do?",
    type: 'list',
    choices: ["Add a basic card", "Add a cloze card", 'View basic cards', 'View cloze cards']
  }]).then(function(answers) {
    if (answers.viewOrAdd === 'Add a basic card') {
      basicCard.addBasicCard();
    } else if (answers.viewOrAdd === 'View basic cards') {
      basicCard.viewBasicCards();
    }
  });
}

firstQuestion();
