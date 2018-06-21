
const _ = require('lodash');
const git = require('simple-git/promise')();
const gh = require('./github_utils');
const messages = require('./messages');


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
}
			


