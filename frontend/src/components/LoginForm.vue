<template>
	<div>
		<v-container class="fill-height" fluid>
			<v-row justify="center">
				<v-col cols="12" sm="10" md="8" lg="6">
					<v-card ref="form">
						<v-card-text>
							<v-text-field
								ref="username"
								v-model="username"
								:rules="[
									() => !!username || 'This field is required',
									() => !!userInformationCorrect || 'Incorrect username or password',
								]"
								label="Username"
								@keydown.enter.prevent="submit"
								required
							></v-text-field>
							<v-text-field
								ref="password"
								v-model="password"
								:rules="[
									() => !!password || 'This field is required',
									() => !!userInformationCorrect || 'Incorrect username or password',
								]"
								label="Password"
								required
								:append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
								@click:append="() => (hidePassword = !hidePassword)"
								@keydown.enter.prevent="submit"
								:type="hidePassword ? 'password' : 'text'"
							></v-text-field>
						</v-card-text>
						<v-divider class="mt-12"></v-divider>
						<v-card-actions>
							<v-btn text :to="`/register`">
								Register
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn color="primary" text @click="submit">
								Login
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
const _ = require("lodash");
import { HTTP } from "../axiosInstance";

export default {
	data: () => ({
		errorMessages: "",
		password: null,
		username: null,
		formHasErrors: false,
		loginAllowed: false,
		userInformationCorrect: true,
		hidePassword: true,
	}),

	computed: {
		form() {
			return {
				username: this.username,
				password: this.password,
			};
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
				if (!this.form[f]) this.formHasErrors = true;
				this.$refs[f].validate(true);
			});

			if (!this.formHasErrors) {
				this.login();
			}
		},

		async login() {
			try {
				const result = await HTTP({
					method: "POST",
					url: "login",
					data: {
						username: this.username,
						password: this.password,
					},
				});
				this.validateForms();
				this.$store.dispatch("storeToken", result);
				this.$router.push("todo-list");
			} catch (error) {
				if (error.response && error.response.data && error.response.data.message === "incorrect_user_information_error") {
					this.userInformationCorrect = false;
					this.validateForms();
					this.debouncedRevertValidate();
				} else {
					console.log(error);
					console.log("error caught logging in", error.response);
				}
			}
		},

		debouncedRevertValidate: _.debounce(function() {
			this.userInformationCorrect = true;
			this.validateForms();
		}, 3000),

		validateForms() {
			this.$refs.username.validate();
			this.$refs.password.validate();
		},
	},
};
</script>
