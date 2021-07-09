<template>
	<v-app id="inspire">
		<NavigationDrawer :drawer="drawer" app />

		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>Todo Lists</v-toolbar-title>
		</v-app-bar>

		<v-main class="pt-0">
			<TodoListPage />
		</v-main>
	</v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import TodoListPage from "@/components/TodoList";

export default {
	data: () => ({ drawer: null }),

	components: {
		NavigationDrawer,
		TodoListPage,
	},
};
</script>
