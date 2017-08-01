const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'flashCards_db',
  port: 3306
});

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
      connection.query(`INSERT INTO clozeCards (full_text, partial_text, answer) values ('${answers.text}', '${clozeSentence}', '${answers.answer}')`,
        function(err, res) {
          if (err) throw err;
          console.log("Cloze card added!");
        });
    })
  },
  viewClozeCards: function() {
    connection.query('SELECT partial_text FROM clozeCards', function(err, res) {
      for (let i = 0; i < res.length; i++) {
        if (err) throw err;
        console.log(res[i].partial_text);
      };
    });
  }
}
