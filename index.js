require('dotenv').config()
const Seach = require("./models/search");
const { Menu, Pause, ReadInput, listOfPlaces } = require("./helpers/inquirer");

const main = async () => {
	const search = new Seach()	
	let optionSeletected = 0;

	do {
		optionSeletected = await Menu()

		switch (optionSeletected) {
			case 1:
				const place = await ReadInput('City:')
				const placesFound = await search.city(place)
				const placeSelected = await listOfPlaces(placesFound)
				console.log(placeSelected)
				break;
		}

		if(optionSeletected !== 0) await Pause()

	} while (optionSeletected !== 0);
}

main()