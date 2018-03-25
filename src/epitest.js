#! /usr/bin/env node

'use strict';

const program = require('commander');
const { prompt } = require('inquirer');
const utils = require('./utils.js');
const api = require('./api.js');

program
  .version('0.0.0')
  .description('Epitest CLI');

program
  .command('login [email]')
  .alias('l')
  .description('login on epitest')
  .action(email => {
    let loginPrompt = [
      {
        type: 'input',
        name: 'email',
        message: 'Email: '
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password: '
      }
    ];

    utils.promptFiltered(loginPrompt, {email})
      .then(answers => {
        return api.login(answers.email, answers.password);
      })
      .then(response => {
        console.log(response);
      })
      .catch(console.error);
  });

program
  .command('build [project]')
  .alias('b')
  .description('build and test a project')
  .option('-r, --remote', 'build on a remote server')
  .action((project, options) => {
    let buildPrompt = [
      {
        type: 'input',
        name: 'project',
        message: 'Project: '
      }
    ];

    utils.promptFiltered(buildPrompt, {
      project,
      remote: options.remote
    })
    .then(answers => {
      api.build(answers.project, answers.remote);
    })
    .catch(console.error);
  });

program.parse(process.argv);