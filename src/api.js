'use strict';

const axios = require('axios');
const apiUrl = 'https://api.arthurchaloin.com/epitest';

axios.defaults.baseURL = 'https://api.arthurchaloin.com/epitest';

axios.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error);
});

function errorHandler(message) {
  let throwNewError = (message, error) => {
    throw `${message} - ${error.response.status} ${error.response.statusText}`;
  }
  return throwNewError.bind(null, message);
}

function login(username, password) {
  return axios.post('/login', {
    username: username,
    password
  })
  .catch(errorHandler('Login failed.'));
}

function build(project, remote) {
  console.log('let\'s build ' + (project ? project : 'something nice') + ' ' + (remote ? 'remote' : 'local') + 'ly!');
  return new Promise(resolve => {
    resolve('OK');
  })
  .catch(errorHandler('Build failed.'));
}

module.exports = {
  login,
  build
};
