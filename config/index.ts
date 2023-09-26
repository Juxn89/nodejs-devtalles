interface IConfig {
	serverPort: string
}

const config = {
	serverPort: process.env.PORT || '3000'
}

export default config