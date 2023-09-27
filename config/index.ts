interface IDBConfig {
	dbName: string,
	dbPassword: string,
	dbPort: string,
	dbServer: string,
	dbUser: string,
}

interface IConfig {
	serverPort: string,
	dbConfig: IDBConfig
}

const config = {
	serverPort: process.env.PORT ?? '3000',
	dbConfig: {
		dbName: process.env.MYSQL_DATABASE ?? '',
		dbPassword: process.env.MYSQL_ROOT_PASSWORD ?? '',
		dbPort: process.env.MYSQL_PORT ?? '',
		dbServer: process.env.MYSQL_DB_SERVER ?? '',
		dbUser: process.env.MYSQL_USER ?? '',
	}
}

export default config