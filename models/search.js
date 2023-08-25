const axios = require('axios')
const config = require('../config/index')

const BASE_URL = `http://api.positionstack.com/v1/forward`

class Seach {
	history = ['Managua', 'Madrid', 'París']

	constructor() {

	}

	async city(place = '') {
		try {

			const params = {
				access_key: config.positionStackAPI,
				query: place
			}

			axios.get(`${BASE_URL}?access_key=${config.positionStackAPI}`)
				.then((result) => {
					console.log(result.data)
					
				}).catch((err) => {
					console.error(err)
				});

			return []
		} catch (error) {
			// console.error(error)
			return []
		}
	}
}

module.exports = Seach