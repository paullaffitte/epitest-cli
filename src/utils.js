'use strict';

const { prompt } = require('inquirer');

function promptFiltered(questions, data) {
  questions = questions.filter(entry => {
    return !data[entry.name];
  });

  return prompt(questions).then(answers => {
    return Object.assign(data, answers);
  });
}

module.exports = {
  promptFiltered
};
