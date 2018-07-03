const program = require('commander');
const chalk = require('chalk');

const github = require('./github');
const config = require('./config');




program
	.version('0.0.1', '-v, --version')
	.description('Version control merge system')




program
	.command('merge <head> <toBranches...>')
	.alias('m')
	.option('-p, --push', 'Push to repo')
	.description('Handles Git merges')
	.action( (head, toBranches, options) => {
		github.gitMerge(head, toBranches, options);
	});




program
	.command('create <repoName> [branches...]')
	.alias('c')
	.option('--no-remote', 'Does not create a remote repository')
	.description('Initiates Git Repository')
	.action( (repoName, branches, cmd) => {
		github.gitCreateRepo(repoName, branches, cmd);
	});




program
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
	});





/*program
	.command('defaults')
	.alias('d')
	.option('-s, --set', 'Set')
	.option('-l, --list', 'List all profiles')
	.option('-r, --remove <value>', 'Remove profile')
	.description('Handles Git/BitBucket profiles')
	.action( cmd => {

		if(cmd.add) {
			profiles.addProfile();

		} else if(cmd.list) {
			profiles.listProfiles();

		} else if(cmd.update) {
			profiles.updateProfile(cmd.update);

		} else if(cmd.set) {
			profiles.setActiveProfile(cmd.set);

		} else if(cmd.remove) {
			profiles.removeProfile(cmd.remove);

		} else {
			const code = chalk.white.italic("'reflow profile --list'");
			console.log(`
  Reflow | PROFILE
				
  Usage: reflow profile [option] <argument>

  NOTE:
  Use ${code} to list all available profiles. All PROFILE commands
  that accept an argument can receive a profile ID or NAME. 
  
  Options: 

    -a, --add            add a profile
    -l, --list           list all profiles
    -u, --update         update a profile          <argument>  id or name
    -s, --set            set active profile        <argument>  id or name
    -r, --remove         remove a profile          <argument>  id or name    
  `);
		}
	});

*/



/*
program
	.command('profile')
	.alias('p')
	.option('-a, --add', 'Add profile')
	.option('-l, --list', 'List all profiles')
	.option('-u, --update <value>', 'Update profile')
	.option('-s, --set <value>', 'Set active profile')
	.option('-r, --remove <value>', 'Remove profile')
	.description('Handles Git/BitBucket profiles')
	.action( cmd => {

		if(cmd.add) {
			profiles.addProfile();

		} else if(cmd.list) {
			profiles.listProfiles();

		} else if(cmd.update) {
			profiles.updateProfile(cmd.update);

		} else if(cmd.set) {
			profiles.setActiveProfile(cmd.set);

		} else if(cmd.remove) {
			profiles.removeProfile(cmd.remove);

		} else {
			const code = chalk.white.italic("'reflow profile --list'");
			console.log(`
  Reflow | PROFILE
				
  Usage: reflow profile [option] <argument>

  NOTE:
  Use ${code} to list all available profiles. All PROFILE commands
  that accept an argument can receive a profile ID or NAME. 
  
  Options: 

    -a, --add            add a profile
    -l, --list           list all profiles
    -u, --update         update a profile          <argument>  id or name
    -s, --set            set active profile        <argument>  id or name
    -r, --remove         remove a profile          <argument>  id or name    
  `);
		}
	});

*/




if (!process.argv.slice(2).length) {
  program.outputHelp();
}




program.parse(process.argv);



