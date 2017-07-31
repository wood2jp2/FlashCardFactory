var inquirer = require('inquirer');

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
      console.log('Card added!');
      var basicCard = new BasicCard(answers.front, answers.back);
      basicCardArray.push(basicCard);

    })
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
  }
}
