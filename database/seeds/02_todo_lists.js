exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("todo_lists")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("todo_lists").insert([
				{ name: "Shopping list", user_id: 1 },
				{ name: "Games to play", user_id: 1 },
				{ name: "Book List", user_id: 1 },
				{ name: "Book List", user_id: 2 },
				{ name: "Home related", user_id: 3 },
				{ name: "Random", user_id: 3 },
				{ name: "Programs to install", user_id: 4 },
			]);
		});
};
