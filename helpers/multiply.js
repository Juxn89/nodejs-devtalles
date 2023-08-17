const fs = require('fs')
const color = require('colors')

const createFile = async (base = 5, list = false, until = 10) => {
	let output = '';

	for (let index = 1; index <= until; index++) {
		output += `${base} x ${index} = ${ base * index }\n`
	}

	try {
		await fs.writeFileSync(`table_${base}.txt`, output)		
	} catch (error) {
		throw error;
	}

	if(list) {
		await console.log(`>>> Table of ${base} <<<`.yellow)
		await console.log(output.green)
	}

	return `table-${base}.txt created!`.rainbow;
}

module.exports = {
	createFile
}