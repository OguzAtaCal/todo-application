exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("todos")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("todos").insert([
				{ name: "Milk", is_completed: true, list_id: 1 },
				{ name: "Tomatoes", is_completed: false, list_id: 1 },
				{ name: "Butter", is_completed: true, list_id: 1 },
				{ name: "Doom", is_completed: true, list_id: 2 },
				{ name: "Doom Eternal", is_completed: true, list_id: 2 },
				{ name: "Odyssey", is_completed: false, list_id: 2 },
				{ name: "Phasmophobia", is_completed: false, list_id: 2 },
				{ name: "Kader Kılıcı", is_completed: false, list_id: 3 },
				{ name: "Dijital Kale", is_completed: true, list_id: 3 },
				{ name: "Kader Kılıcı", is_completed: false, list_id: 4 },
				{ name: "Djital Kale", is_completed: false, list_id: 4 },
				{ name: "Take the trash out", is_completed: false, list_id: 5 },
				{ name: "Clean your room", is_completed: true, list_id: 5 },
			]);
		});
};
