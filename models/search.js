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

			const { data } = await axios.get(`${BASE_URL}`, { params });

			return data.data.map(place => ({
				id: `${place.country_code},${place.longitude},${place.latitude}`,
				name: `${place.country}, ${place.county}, ${place.name}`,
				lng: place.longitude,
				lat: place.latitude
			}))
		} catch (error) {
			// console.error(error)
			return []
		}
	}
}

module.exports = Seach