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
}


const cascade = {
	done: () => {
		return emojis.rainbow + chalk.white("Done!")
	},
}


const github = {
	mergeSuccess: (h,b) => { 
		return emojis.arrowLeftRight + chalk.green(" Branch successfully merged : ") + chalk.blueBright(h) + " => " + chalk.blueBright(b);
	},
	mergeError :(h,b) => {
		return emojis.error + chalk.red("Branch merge rejected : ") + chalk.blueBright(h) + " => " + chalk.blueBright(b);
	},
	pullSuccess: (h) => { 
		return emojis.arrowDown + chalk.green(" Branch successfully pulled : ") + chalk.blueBright(h);
	},
	pullError :(e) => {
		return emojis.error + emojis.arrowDown + chalk.red(" Branch pull rejected : ") + chalk.blueBright(e);
	},
	pullErrorPush :(b) => {
		return emojis.arrowUp + chalk.green(" Pushing branch... : ") + chalk.blueBright(b);
	},
	pushSuccess: (h) => { 
		return emojis.arrowUp + chalk.green(" Branch successfully pushed : ") + chalk.blueBright(h);
	},
	pushError :(h) => {
		return emojis.error + emojis.arrowUp + chalk.red(" Branch pushed rejected : ") + chalk.blueBright(h);
	},
	logMerge :(r) => {
		return JSON.stringify(r, null, 4);
	},
	noGit: () => {
		return emojis.error + chalk.red(" Git needs to be installed to use Cascade.\n Visit 'https://git-scm.com/downloads' to download the installer.")
	},
	noRepo: () => {
		return emojis.error + chalk.red(" This directory is not a Git repository.")
	},
	noBranch :(e) => {
		return JSON.stringify(e, null, 4);
	},
	getRemote: (r) => {
		return emojis.satellite + chalk.green(" Using ") + chalk.magenta(r) + chalk.green(" for github remote."); 
	},
	noRemote: () => {
		return emojis.satellite + chalk.red(" A remote does not exist for this repo. \n Please add one to push your branches. ") + chalk.green("Continuing... ")
	},
}


module.exports = {
	cascade,
	github
}