<template>
	<v-app id="inspire">
		<NavigationDrawer :drawer="drawer" app />

		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>Registration</v-toolbar-title>
		</v-app-bar>

		<v-main>
			<RegisterForm />
		</v-main>
	</v-app>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";
import NavigationDrawer from "@/components/NavigationDrawer";

export default {
	data: () => ({
		drawer: null,
	}),

	components: {
		RegisterForm,
		NavigationDrawer,
	},
};
</script>
