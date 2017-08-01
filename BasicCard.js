// require node modules
const inquirer = require('inquirer');
const mysql = require('mysql');

// SQL database connection holding card information
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'flashCards_db',
  port: 3306
});

// for counter in view cards
var i = 0;

// stuff
connection.connect(function(err) {
  if (err) throw (err);
  console.log("Connected!");
});

// making available to main flashFact.js file
module.exports = {

  // idk
  basicCardArray: [],

  //basic card constructor, sort of
  BasicCard: function(front, back) {
    this.question = front;
    this.answer = back;
  },

  // adding a basic card to the sequel database, using user input
  addBasicCard: function() {
    inquirer.prompt([{
      name: "front",
      message: 'What is your question (front of the card)?'
    }, {
      name: 'back',
      message: 'What is the answer (back of the card)'
    }]).then(function(answers) {
      // pushing new cards into database
      connection.query(`INSERT INTO basicCards (front, back) values ('${answers.front}', '${answers.back}')`,
        function(err, res) {
          if (err) throw err;
          console.log("Card added!");
          // I tried..?
          // var basicCard = new BasicCard(answers.front, answers.back);
          // console.log(basicCard);
          // basicCardArray.push(basicCard);
        });
    });
  },

  // function to 'quiz' yourself using the cards in the sequel database
  viewBasicCards: function() {
    connection.query('SELECT * FROM basicCards', function(err, res) {
      if (err) throw err;
      inquirer.prompt([{
        name: 'frontQuestion',
        message: res[i].front
      }]).then(function(answers) {

        // quiz, checking if answers are correct and looping to next card
        if (answers.frontQuestion === res[i].back) {
          console.log("you are correct!");
          i++;
          module.exports.viewBasicCards();
        } else if (answers.frontQuestion !== res[i].back) {
          console.log('You are incorrect! The correct answer is: ' + res[i].back);
          i++;
          module.exports.viewBasicCards();
        } else {
          console.log('Game over! Make some more cards!')
        }
      });
    });
  }
}
