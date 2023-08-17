const argv = require('yargs')
							.options('b', {
								alias: 'base',
								type: 'number',
								demandOption: true,
								describe: 'It is the base of multiply factor'
							})
							.option('l', {
								alias: 'list',
								type: 'boolean',
								default: false,
								describe: 'Show result on console'
							})
							.option('u', {
								alias: 'until',
								type: 'number',
								default: 10,
								describe: 'Define the limit of the table'
							})
							.check( (argv, options) => {
								if(isNaN(argv.b)) {
									throw 'Base must be a number'
								}
								return true
							} )
							.argv

module.exports = argv;