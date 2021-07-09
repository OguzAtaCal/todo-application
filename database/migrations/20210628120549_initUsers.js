exports.up = function (knex) {
	return knex.schema.createTable("users", (table) => {
		table.increments("id");
		table.string("name").notNullable();
		table.string("email").notNullable();
		table.string("username").notNullable().unique();
		table.string("password").notNullable();
		table.string("city").notNullable();
		table.string("gender").notNullable();
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("users");
};
