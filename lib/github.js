
const _ = require('lodash');
const dir = require('./dir');
const git = require('simple-git/promise')();
const gh = require('./github_utils');
const inquirer = require('./inquirer');
const messages = require('./messages');
const fsys = require('./filesystem');


module.exports = {
	gitMerge: async (head, toBranches, options) => {

		let PUSH = options.push;
		let HAS_REMOTE = await gh.getRemote();

		let branches = [];
		branches.push(head);
		branches = branches.concat(toBranches);

		let pullHead, pullBase,
			pushHead, pushBase;

		for(let i = 0; i < branches.length-1; ++i) {
			if(i == 0 && HAS_REMOTE) {
				pullHead = await gh.pull(branches[i]);
				if(pullHead !== "Error") {
					console.log(pullHead);
				} else {
					if(PUSH) pushHead = await gh.push(branches[i]);
				}
			}
	
			if(HAS_REMOTE) pullBase = await gh.pull(branches[i+1]);

			let merge = await gh.merge(branches[i], branches[i+1]);
			if (merge) {
				console.log(messages.github.mergeSuccess(branches[i], branches[i+1]));
			}
			
			if(PUSH && HAS_REMOTE) {
				pushHead = await gh.push(branches[i]);
				pushBase = await gh.push(branches[i+1]);
			}
		
			if(i == branches.length-2) {
				console.log(messages.cascade.done());
			} 
		}
	},


	gitCreateRepo: async(repoName, branches, cmd) => {
		let isRepo, inq, initRemote, parse_initRemote

		isRepo = await gh.isRepo()
		if(isRepo) {
			console.log(messages.github.isRepo());
			return;
		}

		if(cmd.remote) {
			inq = await inquirer.getUserName();
			console.log(messages.github.addGitPassword(inq.username));
			
			initRemote = await gh.initRemoteRepo(inq.username, repoName);
			parse_initRemote = JSON.parse(initRemote);
		}

		await fsys.readMe.create();
		await gh.initLocalRepo();
		await gh.addAll();
		await git.commit('Initial commit');

		if(branches) {
			for( let i = 0; i < branches.length; ++i ) {
				await gh.createCheckoutBranch(branches[i]);
			}
		}
		
		if(cmd.remote) {
			if(parse_initRemote.id) {
				await git.addRemote('origin', `https://github.com/${inq.username}/${repoName}.git`);
				await gh.push('master');
				if(branches) {
					for( let i = 0; i < branches.length; ++i ) {
						await gh.push(branches[i]);
					}
				}
				console.log(messages.cascade.done());
			} else {
				console.log(messages.github.createRepoError(parse_initRemote.message))
			}
		}		
	}
}
			


