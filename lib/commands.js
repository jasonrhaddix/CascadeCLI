// packages
const program = require('commander');
const chalk = require('chalk');

// modules
const github = require('./github');
const config = require('./config');





program
	.version('0.0.1', '-v, --version')
	.description('Version control merge system')




// ******************************************************
// Merge: merges one of more branches asynchronously
// ******************************************************
program
	.command('merge <head> <toBranches...>')
	.alias('m')
	.option('--no-push', 'Don/\'t push to repo')
	.description('Handles Git merges')
	.action( (head, toBranches, options) => {
		github.gitMerge(head, toBranches, options);
	});




// ******************************************************
// Create: creates a respoitory and [branches...]
// ******************************************************
program
	.command('create <repoName> [branches...]')
	.alias('c')
	.option('--no-remote', 'Does/\'t create a remote repository')
	.description('Initiates Git Repository')
	.action( (repoName, branches, cmd) => {
		github.gitCreateRepo(repoName, branches, cmd);
	});




// ******************************************************
// Config: settings default command options | WIP
// ******************************************************
/*program
	.command('config')
	.option('--push', 'push config')
	.option('--pull', 'pull config')
	.option('--merge', 'merge config')
	.option('--clear-push', 'merge config')
	.description('Sets config options')
	.action( (cmd) => {
		// console.log(cmd)
		if(cmd.push) {
			config.setPush()

		} else if(cmd.pull) {
			config.setPull()

		} else if(cmd.merge) {
			config.setMerge()

		} else if(cmd.clearPush) {
			config.clearMerge()

		} else {
			const code = chalk.white.italic("'cascade config --list'");
			console.log(`
  Cascade | CONFIG
				
  Usage: cascade config [option]

  NOTE:
  Use ${code} to list current config settigns.
  
  Options: 

    --list           list all setting
    --push           init push settings
    --pull           init pull settings
    --merge          init merge settings
  `);
		}
});*/




// Show help if no matching command found
if (!process.argv.slice(2).length) {
  program.outputHelp();
}





program.parse(process.argv);
