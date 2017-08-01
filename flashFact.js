// require nodes and exports
const basicCard = require('./BasicCard.js');
const clozeCard = require('./ClozeCard.js');
const inquirer = require('inquirer');
const mysql = require('mysql');

// sequel stuffs
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'flashCards_db',
  port: 3306
});

// kinect and start the user query
connection.connect(function(err) {
  if (err) throw (err);
  console.log("Connected!");
  firstQuestion();
});

// list prompt, throws imported functions depending on user response
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
    } else if (answers.viewOrAdd === 'Add a cloze card') {
      clozeCard.addClozeCard();
    } else if (answers.viewOrAdd === 'View cloze cards') {
      clozeCard.viewClozeCards();
    }
  });
};
