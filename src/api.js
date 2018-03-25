'use strict';

function login(email, password) {
	console.log('Login on epitest with credentials ' + email + ':' + password);
	return new Promise(resolve => {
		resolve('OK');
	});
}


function build(project, remote) {
console.log('let\'s build ' + (project ? project : 'something nice') + ' ' + (remote ? 'remote' : 'local') + 'ly!');
	return new Promise(resolve => {
		resolve('OK');
	});
}

module.exports = {
	login,
	build
};
