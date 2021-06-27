<template>
	<div>
		<v-container class="fill-height" fluid>
			<v-row justify="center">
				<v-col cols="12" sm="10" md="8" lg="6">
					<v-card ref="card">
						<v-form ref="form">
							<v-card-text>
								<v-text-field
									ref="name"
									v-model="name"
									:rules="[() => !!name || 'This field is required']"
									:error-messages="errorMessages"
									label="Full Name"
									required
								></v-text-field>
								<v-text-field
									ref="email"
									v-model="email"
									:rules="[() => !!email || 'This field is required']"
									label="Email"
									required
								></v-text-field>
								<v-text-field
									ref="username"
									v-model="username"
									:value="usernameTaken"
									:rules="[() => !!username || 'This field is required', () => !!usernameTaken || 'This username was taken']"
									label="Username"
									required
								></v-text-field>
								<v-text-field
									ref="password"
									v-model="password"
									:rules="[() => !!password || 'This field is required']"
									label="Password"
									required
								></v-text-field>
								<v-text-field
									ref="city"
									v-model="city"
									:rules="[() => !!city || 'This field is required']"
									label="City"
									placeholder="Ankara"
									required
								></v-text-field>
								<v-autocomplete
									ref="gender"
									v-model="gender"
									:rules="[() => !!gender || 'This field is required']"
									:items="genders"
									label="Gender"
									placeholder="Select..."
									required
								></v-autocomplete>
							</v-card-text>
							<v-divider class="mt-12"></v-divider>
							<v-card-actions>
								<v-btn text :to="`/login`">
									Cancel
								</v-btn>
								<v-spacer></v-spacer>
								<v-slide-x-reverse-transition>
									<v-tooltip v-if="formHasErrors" left>
										<template v-slot:activator="{ on, attrs }">
											<v-btn icon class="my-0" v-bind="attrs" @click="resetForm" v-on="on">
												<v-icon>mdi-refresh</v-icon>
											</v-btn>
										</template>
										<span>Refresh form</span>
									</v-tooltip>
								</v-slide-x-reverse-transition>
								<v-btn color="primary" text @click="submit">
									Submit
								</v-btn>
							</v-card-actions>
						</v-form>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import axios from "axios";
const _ = require("lodash");
export default {
	data: () => ({
		genders: ["Male", "Female"],
		errorMessages: "",
		name: null,
		email: null,
		city: null,
		gender: null,
		password: null,
		username: null,
		formHasErrors: false,
		drawer: null,
		usernameTaken: true,
	}),

	computed: {
		form() {
			return {
				name: this.name,
				email: this.email,
				username: this.username,
				password: this.password,
				city: this.city,
				gender: this.gender,
			};
		},
	},

	watch: {
		username: async function() {
			this.debouncedQuery();
			this.validate();
		},
	},

	methods: {
		resetForm() {
			this.errorMessages = [];
			this.formHasErrors = false;

			Object.keys(this.form).forEach((f) => {
				this.$refs[f].reset();
			});
		},
		submit() {
			this.formHasErrors = false;
			Object.keys(this.form).forEach((f) => {
				if (!this.form[f]) {
					this.formHasErrors = true;
				}

				this.$refs[f].validate(true);
			});
			if (!this.formHasErrors && this.usernameTaken) {
				console.log("registered");
				this.register();
			}
		},
		register() {
			axios({
				method: "GET",
				url: "http://localhost:3030/users",
			})
				.then((res) => console.log(res.data[0]))
				.catch((err) => console.log("error caught getting users", err.response)),
				axios({
					method: "POST",
					url: "http://localhost:3030/users",
					data: this.form,
				})
					.then((res) => {
						if (res.data && res.data === "error_duplicate_username") console.log("Duplicate user error");
						else console.log(res.data);
					})
					.catch((err) => {
						console.log("error caught creating user", err.response);
						if (err.response.data.message === "duplicate_user_error") console.log("username taken");
					});
		},
		async exists() {
			const result = await axios({
				method: "GET",
				url: "http://localhost:3030/users/" + this.username,
			});
			if (result.data === "User couldnt be found") {
				this.usernameTaken = true;
				return false;
			} else {
				this.usernameTaken = false;
				return true;
			}
		},
		debouncedQuery: _.debounce(function() {
			this.exists();
		}, 1000),
		validate: _.debounce(function() {
			this.$refs.username.validate();
		}, 1500),
	},
};
</script>
