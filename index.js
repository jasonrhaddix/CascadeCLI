#!/usr/bin/env node
const chalk = require('chalk');
const cmdExists = require('command-exists');

const dir = require('./lib/dir')
const messages = require('./lib/messages');




const run = () => {
	cmdExists('git', function(err, cmdExists) {
	    if(cmdExists) {
			const cmd = require('./lib/commands');
	    } else {
	    	console.log(message.github.noGit());
	    }
	});
}




run();
