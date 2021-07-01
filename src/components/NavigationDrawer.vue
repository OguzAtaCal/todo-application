<template>
	<div>
		<v-navigation-drawer v-model="drawerOpen" absolute temporary app>
			<v-list nav dense>
				<v-list>
					<v-list-item v-for="item in items" :key="item.title" :to="item.link">
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>

				<v-list-item v-if="!isLoggedIn" :to="'/login'">
					<v-list-item-icon>
						<v-icon>mdi-login</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Login</v-list-item-title>
				</v-list-item>

				<v-list-item v-if="!isLoggedIn" :to="'/register'">
					<v-list-item-icon>
						<v-icon>mdi-account-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Register</v-list-item-title>
				</v-list-item>

				<v-list-item v-if="isLoggedIn" :to="'/todo'">
					<v-list-item-icon>
						<v-icon>mdi-checkbox-marked-outline</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Todo</v-list-item-title>
				</v-list-item>

				<v-list-item v-if="isLoggedIn" @click="logout">
					<v-list-item-icon>
						<v-icon>mdi-logout</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Logout</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
export default {
	props: ["drawer"],

	data() {
		return {
			drawerOpen: false,
			items: [{ title: "Home", link: "/", icon: "mdi-home" }],
		};
	},

	computed: {
		isLoggedIn: function() {
			return this.$store.state.jwt;
		},
	},

	watch: {
		drawer(newVal) {
			this.drawerOpen = newVal;
		},
	},

	methods: {
		logout() {
			this.$store.dispatch("resetToken");
			this.$router.push("/");
		},
	},
};
</script>
