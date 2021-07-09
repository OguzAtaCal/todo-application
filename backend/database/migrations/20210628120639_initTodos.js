exports.up = function (knex) {
	return knex.schema.createTable("todos", (table) => {
		table.increments("id");
		table.string("name").notNullable();
		table.boolean("is_completed").notNullable();
		table.integer("list_id").notNullable().references("id").inTable("todo_lists").onDelete("CASCADE");
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("todos");
};
