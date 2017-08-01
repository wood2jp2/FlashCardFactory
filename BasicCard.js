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
          console.log("Card added!");
          var basicCard = new BasicCard(answers.front, answers.back);
          console.log(basicCard);
          basicCardArray.push(basicCard);
        });
    });
  },

  viewBasicCards: function() {

    connection.query('SELECT * FROM basicCards', function(err, res) {
      if (err) throw err;
      inquirer.prompt([{
        name: 'frontQuestion',
        message: res[i].front
      }]).then(function(answers) {
        if (answers.frontQuestion === res[i].back) {
          console.log("you are correct!");
          i++;
          module.exports.viewBasicCards();
        } else {
          console.log('You are incorrect! The correct answer is: ' + res[i].back)
        }
      });
    });
  }
}
