const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'flashCards_db',
  port: 3306
});

var i = 0;

module.exports = {
  ClozeCard: function(text, cloze) {
    this.text = text;
    this.cloze = cloze;
  },
  addClozeCard: function() {
    inquirer.prompt([{
        name: 'text',
        message: 'What is the FULL sentence clue, including the answer?'
      },
      {
        name: 'answer',
        message: 'Please type only the answer of your above clue.'
      }
    ]).then(function(answers) {
      let fullQuestion = answers.text;
      let sentenceHalves = fullQuestion.split(answers.answer);
      let clozeSentence = sentenceHalves.join('____________');
      // pushing new cards into database
      connection.query(`INSERT INTO clozeCards (full_text, partial_text, answer) values ('${answers.text}', '${clozeSentence}', '${answers.answer}')`,
        function(err, res) {
          if (err) throw err;
          console.log("Cloze card added!");
        });
    })
  },
  viewClozeCards: function() {
    connection.query('SELECT * FROM clozeCards', function(err, res) {
      if (err) throw err;
      inquirer.prompt([{
        name: 'clozeQuestion',
        message: res[i].partial_text
      }]).then(function(answers) {
        // quiz, checking if answers are correct and looping to next card
        if (answers.clozeQuestion === res[i].answer) {
          console.log("you are correct!");
          i++;
          module.exports.viewClozeCards();
        } else if (answers.clozeQuestion !== res[i].answer) {
          console.log('You are incorrect! The correct answer is: ' + res[i].answer);
          i++;
          module.exports.viewClozeCards();
        } else {
          console.log('Game over! Make some more cards!')
        }
      });
    });
  }
}
