require("dotenv").config();
const { attachPaginate } = require("knex-paginate");
attachPaginate();
module.exports = {
	development: {
		client: "postgresql",
		connection: {
			host: "db",
			database: "postgres",
			user: "docker",
			password: "12345",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};
