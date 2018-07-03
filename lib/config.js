// const Configstore = require('Configstore');
// const pkg = require('../package.json');
// const store = new Configstore(pkg.name);
// const chalk = require('chalk');
// const {table, getBorderCharacters} = require('table');

// const github_auth = require('./github/github_auth');
// const inquirer = require('./inquirer');
// const messages = require('./messages');


// let isNumRegEx = /^[0-9]*$/;


module.exports = {

	setPush:() => {
		console.log("Config Push");
	},

	setPull:() => {
		console.log("Config Pull");
	},

	setMerge:() => {
		console.log("Config Merge");
	},

	clearPush:() => {
		console.log("Clear Push");
	},

	clearPull:() => {
		console.log("Clear Pull");
	},

	clearMerge:() => {
		console.log("Clear Merge");
	}
}