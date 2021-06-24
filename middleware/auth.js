/**
 * auth middleware decorator
 */

const fastifyPlugin = require("fastify-plugin");

module.exports = fastifyPlugin(async (fastify) => {
	fastify.decorate("jwt_authentication", async (req, res) => {
		try {
			await req.jwtVerify();
		} catch (error) {
			console.log("error verifying token");
			res.send(error);
		}
	});
});
