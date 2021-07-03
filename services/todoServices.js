const knex = require("knex");
const knexFile = require("../database/knexfile.js");
const db = knex(knexFile.development);
const { attachPaginate } = require("knex-paginate");

class TodoServices {
	// creating a todo on a specific todo list

	async createTodo(request, reply, id) {
		try {
			console.log(id);
			const { name } = request.body;
			const todoList = await db("todo_lists").where("id", request.params.listId);
			if (todoList[0] && todoList[0].user_id === id) {
				db("todos")
					.insert({
						name: name,
						is_completed: false,
						list_id: request.params.listId,
					})
					.then((result) => {
						reply.code(201);
						console.log("todo added to list");
						reply.send("todo added to list");
					})
					.catch((error) => {
						reply.send(error);
						console.log(error);
					});
			} else reply.send("todo list couldn't be found or wasn't from the correct user");
		} catch (error) {
			console.log("error when creating a todo");
			reply.send(error);
		}
	}

	// getting the todos from a todo list
	async getTodos(request, reply, id) {
		console.log("get");
		try {
			const todoList = await db("todo_lists").where("id", request.params.listId);
			if (todoList[0] && todoList[0].user_id === id) {
				var results = await db("todos").where("list_id", request.params.listId).orderBy("created_at", "asc");
				const { limit, pageOffset } = request.query;
				console.log("limit: ", limit, pageOffset);
				if (limit && pageOffset) {
					const results = await db("todos")
						.where("list_id", request.params.listId)
						.orderBy("created_at", "asc")
						.paginate({ perPage: limit, currentPage: pageOffset });
					reply.send(results.data);
				} else {
					const results = await db("todos").where("list_id", request.params.listId).orderBy("created_at", "asc");
					reply.send(results);
				}
			} else reply.send("todo list couldn't be found or wasn't from the correct user");
		} catch (error) {
			console.log("error when getting todos");
			console.log(error);
			reply.send(error);
		}
	}

	// getting a specific todo from a todo list
	async getTodo(request, reply, id) {
		try {
			const todoList = await db("todo_lists").where("id", request.params.listId);
			if (todoList[0] && todoList[0].user_id === id) {
				const todo = await db("todos").where("id", request.params.todoId);
				if (todo[0] && todo[0].list_id === todoList[0].id) {
					const results = await db("todos").where("id", request.params.todoId);
					reply.send(results);
				} else reply.send("todo couldn't be found or isn't from the correct list");
			} else reply.send("todo list couldn't be found or wasn't from the correct user");
		} catch (error) {
			console.log("error when getting todo");
			reply.send(error);
		}
	}

	// updating a todo
	async updateTodo(request, reply, id) {
		try {
			const { name, is_completed } = request.body;
			const todoList = await db("todo_lists").where("id", request.params.listId);
			if (todoList[0] && todoList[0].user_id === id) {
				const todo = await db("todos").where("id", request.params.todoId);

				if (todo[0] && todo[0].list_id === todoList[0].id) {
					await db("todos").where("id", request.params.todoId).update({
						name: name,
						is_completed: is_completed,
						list_id: request.params.listId,
					});
					reply.send("todo updated");
				} else reply.send("todo couldn't be found or isn't from the correct list");
			} else reply.send("todo list couldn't be found or wasn't from the correct user");
		} catch (error) {
			console.log("error when updating todo");
			reply.send(error);
		}
	}

	// deleting todo
	async deleteTodo(request, reply, id) {
		try {
			const todoList = await db("todo_lists").where("id", request.params.listId);
			if (todoList[0] && todoList[0].user_id === id) {
				const todo = await db("todos").where("id", request.params.todoId);
				if (todo[0] && todo[0].list_id === todoList[0].id) {
					await db("todos").where("id", request.params.todoId).del();
					reply.send("todo deleted");
					console.log("todo ", request.params.todoId, " deleted");
				} else reply.send("todo couldn't be found or isn't from the correct list");
			} else reply.send("todo list couldn't be found or wasn't from the correct user");
		} catch (error) {
			console.log("error when deleting todo");
			reply.send(error);
		}
	}
}

module.exports = new TodoServices();
