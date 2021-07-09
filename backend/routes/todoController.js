const todoServices = require("../services/todoServices");

module.exports = async function callBack(fastify, opts) {
	const postOptions = {
		schema: {
			body: {
				type: "object",
				required: ["name"],
				properties: {
					name: { type: "string" },
				},
			},
		},
		preValidation: [fastify.jwt_authentication],
	};

	const authRequired = {
		preValidation: [fastify.jwt_authentication],
	};

	// get all todos of specific todo list
	fastify.get("/todos/:listId/items", authRequired, async (request, reply) => {
		todoServices.getTodos(request, reply, request.user.userId);
	});

	// get specific todo from id
	fastify.get("/todos/:listId/items/:todoId", authRequired, async (request, reply) => {
		todoServices.getTodo(request, reply, request.user.userId);
	});

	// create a todo
	fastify.post("/todos/:listId/items", postOptions, async (request, reply) => {
		todoServices.createTodo(request, reply, request.user.userId);
	});

	// update todo
	fastify.put("/todos/:listId/items/:todoId", postOptions, async (request, reply) => {
		todoServices.updateTodo(request, reply, request.user.userId);
	});

	// delete todo
	fastify.delete("/todos/:listId/items/:todoId", authRequired, async (request, reply) => {
		todoServices.deleteTodo(request, reply, request.user.userId);
	});
};
