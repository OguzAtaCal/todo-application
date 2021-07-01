const knex = require("knex");
const knexFile = require("../database/knexfile.js");
const db = knex(knexFile.development);
const { attachPaginate } = require("knex-paginate");

class TodoListServices {
	// creating a todo list
	async createTodoList(request, reply, id) {
		const { name } = request.body;

		db("todo_lists")
			.insert({
				name: name,
				user_id: id,
			})
			.then((result) => {
				reply.code(201);
				console.log("todo list added to user ", id, " with name ", name);
				reply.send("Todo list added");
			})
			.catch((error) => {
				reply.send(error);
				console.log("error creating todo list ", error);
			});
	}

	// getting a todo list with a specific id
	async getTodoList(request, reply, id) {
		try {
			const todoList = await db("todo_lists").where("id", request.params.id);
			if (todoList[0] && todoList[0].user_id === id) reply.send(todoList);
			else reply.send("Todo list couldn't be found or it isn't from the correct user");
		} catch (error) {
			console.log("error getting specific todo list ", error);
			reply.send(error);
		}
	}

	// getting all of the todo lists of a user
	async getTodoLists(request, reply, id) {
		try {
			const results = await db("todo_lists").where("user_id", id).orderBy("created_at", "asc");
			reply.send(results);
		} catch (error) {
			console.log("error getting all of the todo lists of user");
			reply.send(error);
		}
	}

	// updating a todo list
	async updateTodoList(request, reply, id) {
		try {
			const { name } = request.body;
			const todoList = await db("todo_lists").where("id", request.params.id);
			if (todoList[0] && todoList[0].user_id === id) {
				await db("todo_lists").where("id", request.params.id).update({
					name: name,
					user_id: id,
				});
				reply.send("todo list updated");
			} else reply.send("todo list couldn't be found or wasn't from the correct user");
		} catch (error) {
			console.log("error updating todo list");
			reply.send(error);
		}
	}

	// delete a todo list
	async deleteTodoList(request, reply, id) {
		try {
			const todoList = await db("todo_lists").where("id", request.params.id);
			if (todoList[0] && todoList[0].user_id == id) {
				await db("todo_lists").where("id", request.params.id).del();
				console.log("todo list ", request.params.id, "deleted");
				reply.send("todo list ", request.params.id, " deleted");
			} else reply.send("todo list couldn't be found or wasn't from the correct user");
		} catch (error) {
			console.log("Error when deleting todo list");
			reply.send(error);
		}
	}
}

module.exports = new TodoListServices();
