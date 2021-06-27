const services = require("../services/todoServices");

const postOptions = {
	schema: {
		body: {
			type: "object",
			required: [],
			properties: {
				// todo
			},
		},
	},
};

module.exports = async function callBack(fastify, opts) {
	const options = {
		preValidation: [fastify.jwt_authentication],
	};

	// get all todos
	fastify.get("/todos", options, async (request, reply) => {
		return "get todos";
	});

	// create a todo
	fastify.post("/todos", options, async (request, reply) => {
		return "post todos";
	});

	// get all todos of a specific user
	fastify.get("/todos/:username", async (request, reply) => {
		return "todos of user";
	});

	// update specific todo
	fastify.put("/todos/:id", postOptions, async (request, reply) => {
		return "specific todo";
	});

	// delete specific todo
	fastify.delete("/todos/:id", postOptions, async (request, reply) => {
		return "deleted todo";
	});
};
