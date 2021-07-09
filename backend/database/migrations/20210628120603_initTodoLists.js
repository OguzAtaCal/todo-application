exports.up = function (knex) {
	return knex.schema.createTable("todo_lists", (table) => {
		table.increments("id");
		table.string("name").notNullable();
		table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("todo_lists");
};
