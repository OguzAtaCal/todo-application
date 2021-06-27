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
			items: [
				{ title: "Home", link: "/", icon: "mdi-home" },
				{ title: "Login", link: "/login", icon: "mdi-login" },
				{ title: "Register", link: "/register", icon: "mdi-account-plus" },
			],
		};
	},

	computed: {
		isLoggedIn: function() {
			return localStorage.jwt;
		},
	},

	watch: {
		drawer(newVal) {
			this.drawerOpen = newVal;
		},
	},

	methods: {
		logout() {
			localStorage.jwt = "";
		},
	},
};
</script>
