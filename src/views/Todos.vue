<template>
	<v-app id="inspire">
		<NavigationDrawer :drawer="drawer" app />

		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>{{ listName }}</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-btn :to="`/todo-list`" plain>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main class="pt-0">
			<TodoPage v-on:childToParent="onTransfer" />
		</v-main>
	</v-app>
</template>

<script>
import TodoPage from "@/components/Todos.vue";
import NavigationDrawer from "@/components/NavigationDrawer";

export default {
	data() {
		return {
			listName: "",
			drawer: false,
		};
	},

	methods: {
		onTransfer(value) {
			this.listName = value;
		},
	},

	components: {
		NavigationDrawer,
		TodoPage,
	},
};
</script>
