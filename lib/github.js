
const _ = require('lodash');
const git = require('simple-git/promise')();

const dir = require('./dir');
const gh = require('./github_utils');
const inquirer = require('./inquirer');
const messages = require('./messages');
const fsys = require('./filesystem');




module.exports = {
	// ******************************************************
	// Merge :
	// ******************************************************
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
				// TODO : Check syntax, create console log
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




	// ******************************************************
	// Create: creates a respoitory and [branches...]
	// ******************************************************
	gitCreateRepo: async(repoName, branches, cmd) => {
		let isRepo, inq, initRemote, parse_initRemote;
		let remoteMessage;

		// check if current directory is a repo
		isRepo = await gh.isRepo()
		if(isRepo) {
			// is repo
			console.log(messages.github.isRepoError());
			return;
		} else {
			// is not repo
			console.log(messages.github.noRepoSuccess());
		}

		// create a remote (efault)
		if(cmd.remote) {
			try {
				inq = await inquirer.getUserName();
				console.log(messages.github.addGitPassword(inq.username));
				
				initRemote = await gh.initRemoteRepo(inq.username, repoName);
				parse_initRemote = JSON.parse(initRemote);
				remoteMessage = parse_initRemote.message;
			
			} catch(error) {
				console.log(error);
				return;
			}
		}

		// if remote
		if(cmd.remote) {	
			if(remoteMessage) {
				//if error
				console.log(messages.github.createRepoError(parse_initRemote.message))
				return;
			} else {
				//if success
				console.log(messages.github.credentialsSuccess());
			}
		}

		// create README
		await fsys.readMe.create();

		// initial local repo
		await gh.initLocalRepo();

		// stage all files
		await gh.addAll();

		// create initial commit
		await git.commit('Initial commit');

		// if branches are passes
		if(branches) {
			for( let i = 0; i < branches.length; ++i ) {
				await gh.createCheckoutBranch(branches[i]);
			}
		}
		
		// if remote add remote and push to repo
		if(cmd.remote) {
			if(parse_initRemote.id) {
				await git.addRemote('origin', `https://github.com/${inq.username}/${repoName}.git`);
				await gh.push('master', true);
				if(branches) {
					for( let i = 0; i < branches.length; ++i ) {
						await gh.push(branches[i], true);
					}
				}
			} else {
				console.log(messages.github.createRepoError(parse_initRemote.message))
			}
		}

		console.log(messages.cascade.done());		
	}
}
			


