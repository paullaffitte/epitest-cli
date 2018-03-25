#! /usr/bin/env node

'use strict';

const program = require('commander');
const { prompt } = require('inquirer');
const utils = require('./utils.js');
const controllers = require('./controllers.js');

program
  .version('0.0.0')
  .description('Epitest CLI');

program
  .command('login [username]')
  .alias('l')
  .description('login on epitest')
  .action(username => {
    let loginPrompt = [
      {
        type: 'input',
        name: 'username',
        message: 'username: '
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password: '
      }
    ];

    utils.promptFiltered(loginPrompt, {username})
      .then(answers => {
        return controllers.login(answers.username, answers.password);
      })
      .catch(console.error);
  });

program
  .command('logout')
  .description('logout from Epitest')
  .action(controllers.logout);

program
  .command('build [project]')
  .alias('b')
  .description('build and test a project')
  .action(project => {
    if (!project)
      project = utils.getRepositoryName();
    controllers.build(project).catch(console.error);
  });

program.parse(process.argv);