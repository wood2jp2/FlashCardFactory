var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
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
        message: 'What is the FULL question you\'d like asked?'
      },
      {
        name: 'answer',
        message: 'What is the answer to your question?'
      }
    ]).then(function(answers) {
      var fullQuestion = answers.text;
      var sentenceHalves = fullQuestion.split(answers.answer);
      var clozeSentence = sentenceHalves.join('____________');
      console.log(clozeSentence);
      // NEED to manipulate answers to provide half sentence without answer...Partial
      connection.query(`INSERT INTO clozeCards (full_text, partial_text, answer) values ('${answers.text}', '${clozeSentence}', '${answers.answer}')`,
        function(err, res) {
          if (err) throw err;
          console.log("Cloze card added!")
        });
    })
  }
}
