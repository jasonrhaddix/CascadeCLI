
const _ = require('lodash');
const git = require('simple-git/promise')();
const { exec, spawn } = require('child-process-async');
const CLI = require('clui');
const Spinner = CLI.Spinner;

const messages = require('./messages');


module.exports = {

	//**********************************************
	// Merge :
	//**********************************************
	merge: async (base, head) => {
		git.checkout(head);

		try {
			let result = await git.mergeFromTo(base, head, ['--no-ff'], (res) =>  { })
			return result;
		} catch(err) { 
			console.log(messages.github.mergeError(head, base));
		}
	},
	



	//**********************************************
	// Pull :
	//**********************************************
	pullAllBranches: async (a) => {
		for( let i = 0; i < a.length; ++i ) {
			git.checkout(a[i]);
			let pull = await module.exports.pull(a[i]);
		}
	},

	pull: async (branch) => {
		let status = new Spinner('Pulling from repo...');
		status.start();

		try {
			let result = await git.pull('origin', branch, (res) =>  { })
			status.stop();
			console.log(messages.github.pullSuccess(branch));
			return result;
		} catch(err) { 
			status.stop();
			console.log(messages.github.pullError(branch));
			return "Error";
		}
	},
	



	//**********************************************
	// Push :
	//**********************************************
	pushAllBranches: async (a) => {
		for( let i = 0; i < a.length; ++i ) {
			git.checkout(a[i]);
			let push = await module.exports.push(a[i]);
		}
	},

	push: async (branch) => {
		let status = new Spinner('Pushing to repo...');
		status.start();

		try {
			let result = await git.push('origin', branch, (res) =>  { })
			status.stop();
			console.log(messages.github.pushSuccess(branch));
			return result;
		} catch(err) { 
			status.stop();
			console.log(messages.github.pushError(branch));
		}
	},




	//**********************************************
	// Custom : 
	//**********************************************
	getRemote: async() => {
		const result = await exec('git remote', {});
		if(result.stdout) {
			console.log(messages.github.getRemote(result.stdout));
			return await result.stdout;
		} else {
			console.log(messages.github.noRemote());
			return undefined;
		}
	},

	getCurrectRepo: async() => {
		const child = await exec('basename -s .git `git config --get remote.origin.url`', {});
		//const { stdout, stderr } = await child;
		return await child.stdout;
	},

	getCurrectBranch: async() => {
		const child = await exec('git rev-parse --abbrev-ref HEAD', {});
		//const { stdout, stderr } = await child;
		return await child.stdout;
	}
}
