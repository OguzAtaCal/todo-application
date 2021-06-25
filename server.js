const fastify = require("fastify");
const app = fastify();
const usersRoute = require("./routes/controller.js");
require("dotenv").config();

app.get("/", (request, reply) => {
	return "Hello World";
});

// register javascript web token
app.register(require("fastify-jwt"), {
	secret: process.env.JWT_SECRET,
});

// register plugin for jwt authentication
app.register(require("./middleware/auth"));

// registering endpoints
app.register(usersRoute);

// registering cors to allow access from other ports
app.register(require("fastify-cors"), {
	origin: "*",
});

// starting the app
app.listen(3030, () => console.log("Server set up at port 3030"));
