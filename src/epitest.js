#! /usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const utils = require('./utils.js');
const api = require('./api.js');

program
  .version('0.0.0')
  .option('-r, --remote', 'build on a remote server')
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

    prompt(utils.filterPrompt(loginPrompt, {email}))
      .then(answers => {
        api.login(answers.email, answers.password);
      });
  });

program
  .command('build [project]')
  .alias('b')
  .description('build and test a project')
  .action(project => {
    let promises = new Promise(resolve => { resolve() });

    if (!program.remote)
      promises = promises.then(prompt.bind(null, [
        {
          type: 'list',
          name: 'build_location',
          message: 'please select a build location',
          choices: ['remote', 'local']
        }
      ]));
    else
      promises = promises.then(() => { return {build_location: 'remote'}; });

    promises.then(answers => {
      console.log('let\'s build ' + (project ? project : 'something nice') + ' ' + answers.build_location + 'ly!');
    });
  });

program.parse(process.argv);