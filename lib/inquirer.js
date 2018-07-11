const inquirer = require('inquirer');

module.exports = {
	getUserName:() => {
		const questions = [
			{
				name: 'username',
				type: 'input',
				message: 'Enter host username:',
				validate: (value) => {
					return (value.length) 
						? true : "Please enter host username";
				}
			}
		];

		return inquirer.prompt(questions);
	}
}