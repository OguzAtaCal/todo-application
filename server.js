const fastify = require("fastify");
const app = fastify();
const usersRoute = require("./routes/controller.js");

app.get("/", (request, reply) => {
	return "Hello World";
});

app.listen(3030, () => console.log("Server set up at port 3030"));

app.register(usersRoute);

app.register(require("fastify-cors"), {
	origin: "*",
});
