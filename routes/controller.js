const services = require("../services");
const cors = require("cors");

const postOptions = {
	schema: {
		body: {
			type: "object",
			required: ["username", "password"],
			properties: {
				name: { type: "string" },
				email: { type: "string" },
				username: { type: "string" },
				password: { type: "string" },
				city: { type: "string" },
				gender: { type: "string" },
			},
		},
	},
};

module.exports = async function callBack(fastify, opts) {
	// get request
	fastify.get("/users", async (request, reply) => {
		return services.getUsers(request, reply);
	});

	// post request
	fastify.post("/users", postOptions, async (request, reply) => {
		services.createUser(request, reply);
	});

	// get specific user
	fastify.get("/users/:username", async (request, reply) => {
		return services.getUser(request, reply);
	});

	// update specific user
	fastify.put("/users/:username", postOptions, async (request, reply) => {
		return services.updateUser(request, reply);
	});

	// delete specific user
	fastify.delete("/users/:username", postOptions, async (request, reply) => {
		return services.deleteUser(request, reply);
	});
};
