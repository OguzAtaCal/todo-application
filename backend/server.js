require("dotenv").config();

const fastify = require("fastify");
const app = fastify();
const usersRoute = require("./routes/userController.js");
const todoListRoute = require("./routes/todoListController.js");
const todoRoute = require("./routes/todoController");

app.get("/", (request, reply) => {
	console.log("get requst");
	reply.send("Hello World");
});

// register javascript web token
app.register(require("fastify-jwt"), {
	secret: process.env.JWT_SECRET,
});

// register plugin for jwt authentication
app.register(require("./middleware/auth"));

// registering endpoints
app.register(usersRoute);
app.register(todoListRoute);
app.register(todoRoute);

// registering cors to allow access from other ports
app.register(require("fastify-cors"), {
	origin: "*",
});

// starting the app
app.listen(3030, "0.0.0.0", () => console.log("Server set up at port 3030"));
