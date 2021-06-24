const fastify = require("fastify");
const app = fastify();
const usersRoute = require("./routes/controller.js");
require("dotenv").config();

app.get("/", (request, reply) => {
	return "Hello World";
});

app.register(require("fastify-jwt"), {
	secret: process.env.JWT_SECRET,
});

app.register(require("./middleware/auth"));

app.register(usersRoute);

app.register(require("fastify-cors"), {
	origin: "*",
});

app.listen(3030, () => console.log("Server set up at port 3030"));
