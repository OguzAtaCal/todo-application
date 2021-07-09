<template>
	<v-app id="inspire">
		<NavigationDrawer :drawer="drawer" app />

		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>Home</v-toolbar-title>
		</v-app-bar>

		<v-main class="pt-0">
			<Home />
		</v-main>
	</v-app>
</template>

<script>
import Home from "@/components/HomePage";
import NavigationDrawer from "@/components/NavigationDrawer";

export default {
	data: () => ({ drawer: null }),

	components: {
		Home,
		NavigationDrawer,
	},
};
</script>
