require('dotenv').config()
const Seach = require("./models/search");
const { Menu, Pause, ReadInput } = require("./helpers/inquirer");

const main = async () => {
	const search = new Seach()	
	let optionSeletected = 0;

	do {
		optionSeletected = await Menu()

		switch (optionSeletected) {
			case 1:
				const place = await ReadInput('City:')
				await search.city(place)
				break;
		}

		if(optionSeletected !== 0) await Pause()

	} while (optionSeletected !== 0);
}

main()