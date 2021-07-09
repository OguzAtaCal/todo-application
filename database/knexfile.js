require("dotenv").config();
const { attachPaginate } = require("knex-paginate");
attachPaginate();
module.exports = {
	development: {
		client: "postgresql",
		connection: {
			database: "postgres",
			user: "postgres",
			password: process.env.DB_PASSWORD,
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
