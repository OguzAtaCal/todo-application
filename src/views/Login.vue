<template>
	<v-app id="inspire">
		<NavigationDrawer :drawer="drawer" app />

		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>Login</v-toolbar-title>
		</v-app-bar>

		<v-main>
			<LoginForm />
		</v-main>
	</v-app>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import NavigationDrawer from "@/components/NavigationDrawer";

export default {
	data: () => ({
		drawer: null,
	}),

	components: {
		LoginForm,
		NavigationDrawer,
	},
};
</script>
