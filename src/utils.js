'use strict';

const { prompt } = require('inquirer');
const Configstore = require('configstore');
const pkg = require('../package.json');

const conf = new Configstore(pkg.name);

function promptFiltered(questions, data) {
  questions = questions.filter(entry => {
    return !data[entry.name];
  });

  return prompt(questions).then(answers => {
    return Object.assign(data, answers);
  });
}

function isLogged() {
  return conf.get('userToken') ? true : false;
}

module.exports = {
  conf,
  promptFiltered,
  isLogged,
};
