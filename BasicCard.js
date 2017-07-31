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
});

module.exports = {
  basicCardArray: [],
  BasicCard: function(front, back) {
    this.question = front;
    this.answer = back;
  },
  addBasicCard: function() {
    inquirer.prompt([{
      name: "front",
      message: 'What is your question (front of the card)?'
    }, {
      name: 'back',
      message: 'What is the answer (back of the card)'
    }]).then(function(answers) {
      connection.query(`INSERT INTO basicCards (front, back) values ('${answers.front}', '${answers.back}')`,
        function(err, res) {
          if (err) throw err;
          console.log("Card added!")
        });
      var basicCard = new BasicCard(answers.front, answers.back);
      console.log(basicCard.front);
      basicCardArray.push(basicCard);
    });
  },
  viewBasicCards: function() {
    inquirer.prompt([{
      name: 'viewBasicCard',
      message: 'Please choose a card to view.',
      type: 'list',
      choices: this.basicCardArray,
    }]).then(function(answers) {
      console.log(answers.viewBasicCard);
      console.log('basiccards');
    })
  },

}
