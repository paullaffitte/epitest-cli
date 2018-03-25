'use strict';

const axios = require('axios');
const utils = require('./utils.js')

const apiUrl = 'https://api.arthurchaloin.com/epitest';

axios.defaults.baseURL = 'https://api.arthurchaloin.com/epitest';

if (utils.isLogged())
  axios.defaults.headers.common['Authorization'] = utils.conf.get('userToken');

axios.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error);
});

function errorHandler(message) {
  let throwNewError = (message, error) => {
    if (error && error.response)
      throw `${message}: ${error.response.status} ${error.response.statusText}`;
    else
      throw message;
  }
  return throwNewError.bind(null, message);
}

function login(username, password) {
  return axios.post('/login', {
    username: username,
    password
  })
  .catch(errorHandler('Login failed'));
}

function build(project) {
  return axios.post(`/jobs/${project}/build`).catch(errorHandler('Build failed'));
}

module.exports = {
  login,
  build
};
