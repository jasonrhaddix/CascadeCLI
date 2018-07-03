var fs = require('fs');





var content_readMe = 
`
## Overview
Overview here


<p align="right"><sub><sup>generated by:</sup></sub></p>
<p align="right"><img width=7% src="https://raw.githubusercontent.com/jasonrhaddix/cascade-cli/master/cc-logo.png"></p>
`;





const readMe = {
	create: async() => {
		try{
		    await fs.writeFileSync('README.md', content_readMe);
		    return true;
		}catch (err){
		    console.log("Cannot write file ", err);
		}
	},

	edit: (branch) => {
		var data = fs.readFileSync('README.md', 'utf-8');
		var value = data.replace(/^\./gim, 'Rewrite');
		fs.writeFileSync('filelistSync.txt', value, 'utf-8');
		console.log('readFileSync complete');
	}
}





module.exports = {
	readMe
}