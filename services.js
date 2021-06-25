const knex = require("knex");
const knexFile = require("./database/knexfile.js");
const db = knex(knexFile.development);
const { attachPaginate } = require("knex-paginate");
const bcrypt = require("bcrypt");

attachPaginate();

class UserServices {
	async createUser(request, reply) {
		const { name, email, username, password, city, gender } = request.body;
		bcrypt.hash(password, 10, async function (err, hash) {
			db("users")
				.insert({
					name: name,
					email: email,
					username: username,
					password: hash,
					city: city,
					gender: gender,
				})
				.then((result) => {
					reply.status(201);
					console.log("user added: ", name);
					reply.send("User added");
				})
				.catch((error) => {
					if (error.code === "23505") {
						reply.send(new Error("duplicate_user_error"));
					} else {
						console.log("an error has been caught creating a user");
						reply.send(error);
					}
				});
		});
	}

	async getUsers(request, reply) {
		try {
			const knexQuery = db("users");
			const { limit, pageOffset } = request.query;
			if (limit && pageOffset)
				knexQuery.paginate({ perPage: limit, currentPage: pageOffset });
			return knexQuery;
		} catch (err) {
			console.log("an error has been caught getting all users");
			return err;
		}
	}

	async getUser(request, reply) {
		try {
			const user = await db("users").where("username", request.params.username);
			if (user[0]) return user;
			else return "User couldnt be found";
		} catch (err) {
			console.log("an error has been caught getting specific user");
			return err;
		}
	}

	async updateUser(request, reply) {
		try {
			const { name, email, username, password, city, gender } = request.body;
			db("users").where("username", request.params.username).update({
				name: name,
				email: email,
				username: username,
				password: password,
				city: city,
				gender: gender,
			});
			return "User: " + request.params.username + " updated";
		} catch (err) {
			console.log("an error has been caught updating user");
			return err;
		}
	}

	async deleteUser(request, reply) {
		try {
			db("users").where("username", request.params.username).del();
			return "User: " + request.params.username + " deleted";
		} catch (err) {
			console.log("an error has been caught updating user");
			return err;
		}
	}

	async login(fastify, request, reply) {
		try {
			const { username, password } = request.body;
			const user = await db("users").where("username", request.body.username);

			// checking if the query found a user
			if (!user[0]) return new Error("username_not_found_error");

			// checking if the password matches
			const equal = await bcrypt.compare(password, user[0].password);
			if (!equal) reply.send(new Error("incorrect_password_error"));
			else {
				const token = fastify.jwt.sign({ username, password });
				return token;
			}
		} catch (error) {
			console.log("an error has been caught creating access token");
			return error;
		}
	}
}

module.exports = new UserServices();
