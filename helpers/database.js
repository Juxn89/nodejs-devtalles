const fs = require('fs')

const dbPath = './db/data.json'

const saveRecord = (data) => {
	fs.writeFileSync(dbPath, JSON.stringify(data))
}

const getRecords = () => {
	if(!fs.existsSync(dbPath)) return null;

	const info = fs.readFileSync(dbPath, { encoding: 'utf-8' })
	const data = JSON.parse(info);
	return data;
}

module.exports = {
	saveRecord,
	getRecords
}