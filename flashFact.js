var basicCard = require('./BasicCard.js');
var clozeCard = require('./ClozeCard.js');
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'flashCards_db',
  port: 3306
});

connection.connect(function(err) {
  if (err) throw (err);
  console.log("Connected!");
  firstQuestion();
});

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
