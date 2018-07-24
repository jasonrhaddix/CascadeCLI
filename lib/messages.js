const chalk = require('chalk');
const emoji = require('node-emoji')




const emojis = {
	success: emoji.get('white_check_mark') + "  ",
	warning: emoji.get('warning') + "  ",
	error: emoji.get('x') + "  ",
	rainbow: emoji.get('rainbow') + "  ",
	arrowUp: emoji.get('arrow_up') + "  ",
	arrowDown: emoji.get('arrow_down') + "  ",
	arrowLeftRight: emoji.get('left_right_arrow') + "  ",
	satellite: emoji.get('satellite') + "  ",
	key: emoji.get('key'),
}




const cascade = {
	done: () => {
		return emojis.rainbow + chalk.white("done!")
	},
}




const filesystem = {
	fileCreateSuccess: (f) => {
	 	return chalk.green("file successfully created : " + f);
	},
	fileCreateError: (f) => {
		return chalk.red("cannot create file : " + f);
	}
}




const github = {
	mergeSuccess: (h,b) => { 
		return emojis.arrowLeftRight + chalk.green(" branch successfully merged : ") + chalk.blueBright(h) + " => " + chalk.blueBright(b);
	},
	mergeError :(h,b) => {
		return emojis.error + chalk.red("branch merge rejected : ") + chalk.blueBright(h) + " => " + chalk.blueBright(b);
	},
	pullSuccess: (h) => { 
		return emojis.arrowDown + chalk.green(" branch successfully pulled : ") + chalk.blueBright(h);
	},
	pullError :(e) => {
		return emojis.error + emojis.arrowDown + chalk.red(" branch pull rejected : ") + chalk.blueBright(e);
	},
	pullErrorPush :(b) => {
		return emojis.arrowUp + chalk.green(" pushing branch... : ") + chalk.blueBright(b);
	},
	pushSuccess: (h) => { 
		return emojis.arrowUp + chalk.green(" branch successfully pushed : ") + chalk.blueBright(h);
	},
	pushError :(h) => {
		return emojis.error + emojis.arrowUp + chalk.red(" branch pushed rejected : ") + chalk.blueBright(h);
	},
	logMerge :(r) => {
		return JSON.stringify(r, null, 4);
	},
	noGit: () => {
		return emojis.error + chalk.red(" git needs to be installed to use Cascade.\n visit 'https://git-scm.com/downloads' to download the installer");
	},
	noRepo: () => {
		return emojis.error + chalk.red(" this directory is not a git repository");
	},
	noRepoSuccess: () => {
		return chalk.green("clean directory!");
	},
	credentialsSuccess: () => {
		return chalk.green("success!");
	},
	isRepoError: () => {
		return emojis.error + chalk.red(" this directory is already a git repository");
	},
	noBranch :(e) => {
		return JSON.stringify(e, null, 4);
	},
	getRemote: (r) => {
		return emojis.satellite + chalk.green(" using ") + chalk.magenta(r) + chalk.green(" for github remote"); 
	},
	noRemote: () => {
		return emojis.satellite + chalk.red(" a remote does not exist for this repo. \n please add one to push your branches. ") + chalk.green("continuing... ");
	},
	addGitPassword: (user) => {
		return "Enter host password for user '" + user + "' " + emojis.key + " : " + chalk.blueBright("(password hidden)");
	},
	createRepoError: (message) => {
		return emojis.error + chalk.red(` ${message}`).toLowerCase();
	}
}




module.exports = {
	cascade,
	filesystem,
	github
}