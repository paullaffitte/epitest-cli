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
        utils.conf.set('userToken', data.response);
        console.log('Successfully logged in your Epitest account!')
      })
      .catch(console.error);
  });

program
  .command('logout')
  .description('logout from Epitest')
  .action(() => {
    utils.conf.delete('userToken');
    console.log('Successfully logged out of your Epitest account!')
  })

program
  .command('build [project]')
  .alias('b')
  .description('build and test a project')
  .action(project => {
    if (!project)
      project = utils.getRepositoryName();

    api.build(project)
      .then(() => {
        console.log(`Build started: https://epitest.arthurchaloin.com/project/${project}`);
      })
      .catch(console.error);
  });

program.parse(process.argv);