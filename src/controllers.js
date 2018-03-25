'use strict';

const utils = require('./utils.js');
const api = require('./api.js');

function login(username, password) {
  if (utils.isLogged())
    logout(true);
  return api.login(username, password)
    .then(data => {
      utils.conf.set('userToken', data.response);
      console.log('Successfully logged in your Epitest account!')
    });
}

function logout(hideMessage) {

  if (utils.isLogged()) {
    utils.conf.delete('userToken');
    if (hideMessage !== true)
      console.log('Successfully logged out of your Epitest account!');
  } else {
    if (hideMessage !== true)
      console.error('Already logged out.');
  }
}

function build(project) {
  return api.build(project).then(() => {
    console.log(`Build started: https://epitest.arthurchaloin.com/project/${project}`);
  });
}

module.exports = {
  login,
  logout,
  build
};
