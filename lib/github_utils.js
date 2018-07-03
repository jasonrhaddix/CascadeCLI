
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
	// Push :
	//**********************************************
	addAll: async () => {
		const child = await exec('git add .', {});
		return await child.stdout;
	},




	//**********************************************
	// Custom : 
	//**********************************************
	getUser: async() => {
		const child = await exec(`git config user.name`, {});
		//const { stdout, stderr, error } = await child;
		return await child.stdout;
	},

	initLocalRepo: async() => {
		let repo = await git.init();
		return await repo;
	},

	initRemoteRepo: async(user, repoName) => {
		let args = '{\\\"name\\\":\\\"'+repoName+'\\\"}';
		const child = await exec('curl -u '+ user +' https://api.github.com/user/repos -d '+ args +'', {});
		return await child.stdout;
	},
	
	isRepo: async() => {
		let isRepo = await git.checkIsRepo()
		return isRepo;
	},

	getCurrectRepo: async() => {
		const child = await exec('basename -s .git `git config --get remote.origin.url`', {});
		//const { stdout, stderr, error } = await child;
		return await child.stdout;
	},
	
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

	createBranch: async(branch) => {
		const child = await exec(`git branch ${branch}`, {});
		//const { stdout, stderr } = await child;
		return await child.stdout;
	},

	createCheckoutBranch: async(branch) => {
		const child = await exec(`git checkout -b ${branch}`, {});
		//const { stdout, stderr } = await child;
		return await child.stdout;
	},

	getCurrectBranch: async() => {
		const child = await exec('git rev-parse --abbrev-ref HEAD', {});
		//const { stdout, stderr } = await child;
		return await child.stdout;
	}
}
