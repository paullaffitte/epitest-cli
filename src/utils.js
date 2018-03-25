'use strict';

const { prompt } = require('inquirer');
const Configstore = require('configstore');
const pkg = require('../package.json');
const fs = require('fs');

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

function getRepositoryPathRec(folder) {
  let found = false;

  fs.readdirSync(folder ? folder : '/').forEach(file => {
    if (file == '.git')
      found = true;
  });

  if (found)
    return folder;

  if (!folder)
    return null;

  let folders = folder.split('/');
  folders.pop();
  return getRepositoryPathRec(folders.join('/'));
}

function getRepositoryPath() {
  return getRepositoryPathRec(process.cwd());
}

function getRepositoryName() {
  return getRepositoryPath().split('/').pop();
}

module.exports = {
  conf,
  promptFiltered,
  isLogged,
  getRepositoryPath,
  getRepositoryName
};
