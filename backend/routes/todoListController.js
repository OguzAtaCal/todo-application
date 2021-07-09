const todoListServices = require("../services/todoListServices");

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

	// get all todo lists of the specific user from the token
	fastify.get("/todos", authRequired, async (request, reply) => {
		todoListServices.getTodoLists(request, reply, request.user.userId);
	});

	// create a todo list to the user with id
	fastify.post("/todos", postOptions, async (request, reply) => {
		todoListServices.createTodoList(request, reply, request.user.userId);
	});

	// get the todo list with id: if of the user id from the token
	fastify.get("/todos/:id", authRequired, async (request, reply) => {
		todoListServices.getTodoList(request, reply, request.user.userId);
	});

	// update specific todo
	fastify.put("/todos/:id", postOptions, async (request, reply) => {
		todoListServices.updateTodoList(request, reply, request.user.userId);
	});

	// delete specific todo
	fastify.delete("/todos/:id", authRequired, async (request, reply) => {
		todoListServices.deleteTodoList(request, reply, request.user.userId);
	});
};
