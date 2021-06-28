const todoServices = require("../services/todoListServices");

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

	const options = {
		preValidation: [fastify.jwt_authentication],
	};

	// get all todo lists of the specific user from the token
	fastify.get("/todos", options, async (request, reply) => {
		const auth = request.headers.authorization;
		const token = auth.split(" ")[1];
		fastify.jwt.verify(token, (err, decoded) => {
			if (err) {
				console.log(err);
				reply.send("There has been an error verifying jwt");
			}
			todoServices.getTodoLists(request, reply, decoded.userId);
		});
	});

	// create a todo list to the user with id
	fastify.post("/todos", postOptions, async (request, reply) => {
		const auth = request.headers.authorization;
		const token = auth.split(" ")[1];
		fastify.jwt.verify(token, (err, decoded) => {
			if (err) {
				console.log(err);
				reply.send("There has been an error verifying jwt");
			}
			todoServices.createTodoList(request, reply, decoded.userId);
		});
	});

	// get the todo list with id: if of the user id from the token
	fastify.get("/todos/:id", options, async (request, reply) => {
		const auth = request.headers.authorization;
		const token = auth.split(" ")[1];
		fastify.jwt.verify(token, (err, decoded) => {
			if (err) {
				console.log(err);
				reply.send("There has been an error verifying jwt");
			}
			todoServices.getTodoList(request, reply, decoded.userId);
		});
	});

	// update specific todo
	fastify.put("/todos/:id", postOptions, async (request, reply) => {
		const auth = request.headers.authorization;
		const token = auth.split(" ")[1];
		fastify.jwt.verify(token, (err, decoded) => {
			if (err) {
				console.log(err);
				reply.send("There has been an error verifying jwt");
			}
			todoServices.updateTodoList(request, reply, decoded.userId);
		});
	});

	// delete specific todo
	fastify.delete("/todos/:id", postOptions, async (request, reply) => {
		const auth = request.headers.authorization;
		const token = auth.split(" ")[1];
		fastify.jwt.verify(token, (err, decoded) => {
			if (err) {
				console.log(err);
				reply.send("There has been an error verifying jwt");
			}
			todoServices.deleteTodoList(request, reply, decoded.userId);
		});
	});
};
