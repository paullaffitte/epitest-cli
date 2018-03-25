#! /usr/bin/env node

'use strict';

const program = require('commander');
const { prompt } = require('inquirer');
const Configstore = require('configstore');
const pkg = require('../package.json');
const utils = require('./utils.js');
const api = require('./api.js');

const conf = new Configstore(pkg.name);

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
        return api.login(answers.username, answers.password);
      })
      .then(data => {
        conf.set('userToken', data.response);
        console.log('Successfully connected to your Epitest account!')
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