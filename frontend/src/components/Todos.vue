<template>
	<v-list dense rounded>
		<v-text-field
			v-if="hasData"
			hide-details
			label="Search for a task"
			outlined
			append-icon="mdi-magnify"
			@click:append="searchList"
			@keydown.enter.prevent="searchList"
			v-model="searchName"
			class="pb-3"
			clearable
		>
		</v-text-field>

		<v-text-field
			clearable
			hide-details
			v-model="newTaskName"
			outlined
			label="Add a new task"
			append-icon="mdi-plus"
			@click:append="addTask"
			@keydown.enter.prevent="addTask"
			class="pb-3"
		></v-text-field>

		<div v-for="item in items" :key="item.id">
			<v-list-item v-if="!item.edit" @click="doTask(item.id)" :class="{ 'blue lighten-5': item.completed }">
				<template v-slot:default>
					<v-list-item-action>
						<v-checkbox :input-value="item.completed"></v-checkbox>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title :class="{ 'text-decoration-line-through': item.completed }">{{ item.name }}</v-list-item-title>
					</v-list-item-content>

					<v-list-item-action>
						<v-menu left offset-x rounded="b-lg">
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon v-bind="attrs" v-on.stop="on" @click.stop.prevent>
									<v-icon>mdi-dots-vertical</v-icon>
								</v-btn>
							</template>

							<v-list class="pt-0 pb-0">
								<v-list-item @click.stop="showTextField(item.id)">
									<v-list-item-icon class="mr-3">
										<v-icon small>mdi-pencil</v-icon>
									</v-list-item-icon>
									<v-list-item-content class="mr-3">Rename</v-list-item-content>
								</v-list-item>

								<v-list-item @click.stop="deleteTask(item.id)">
									<v-list-item-icon class="mr-3">
										<v-icon small>mdi-delete</v-icon>
									</v-list-item-icon>
									<v-list-item-content class="mr-3">Delete</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-list-item-action>
				</template>
			</v-list-item>

			<v-text-field
				class="pt-3 pb-3"
				v-if="item.edit"
				v-model="editedTaskName"
				hide-details
				label="Rename task"
				outlined
				append-icon="mdi-pen"
				@click:append="editTask(item.id)"
				@keydown.enter.prevent="editTask(item.id)"
			>
			</v-text-field>
		</div>

		<Footer v-on:transferInfo="onTransfer" v-on:deleteCompleted="deleteCompleted" isTodo="true" :blocked="searching" />
	</v-list>
</template>

<script>
import { HTTP } from "../axiosInstance";
import Footer from "@/components/Footer.vue";

export default {
	components: {
		Footer,
	},

	data: () => ({
		items: [],
		searchName: null,
		editing: false,
		editedTaskName: null,
		newTaskName: null,
		listName: "test",
		currentPage: 1,
		perPage: 0,
		hasData: false,
		searching: false,
	}),

	methods: {
		async deleteCompleted() {
			const results = await HTTP({
				method: "GET",
				url: `todos/${this.$route.params.id}/items`,
			});

			if (results.data[0]) {
				var deleted = false;
				for (var i = 0; i < results.data.length; i++) {
					if (results.data[i].is_completed) {
						await HTTP({
							method: "DELETE",
							url: `todos/${this.$route.params.id}/items/${results.data[i].id}`,
						});
						deleted = true;
					}
				}
				if (deleted) await this.initTodosArray();
			}
		},

		showTextField(id) {
			if (!this.editing) {
				this.items = this.items.filter((item) => {
					if (item.id === id) {
						this.editing = true;
						this.editedTaskName = item.name;
						item.edit = true;
					}
					return item;
				});
			}
		},

		async initHasData() {
			const results = await HTTP({
				method: "GET",
				url: `todos/${this.$route.params.id}/items`,
			});
			if (results.data[0]) {
				this.hasData = true;
			} else this.hasData = false;
		},

		async initTodosArray() {
			try {
				this.items = [];
				const todoList = await HTTP({
					method: "GET",
					url: `todos/${this.$route.params.id}`,
				});
				if (todoList && todoList.data[0]) {
					this.listName = todoList.data[0].name;
					this.emitToParent();
				}

				await this.initHasData();

				const results = await HTTP({
					method: "GET",
					url: `todos/${this.$route.params.id}/items?limit=${this.perPage}&pageOffset=${this.currentPage}`,
				});

				if (results.data[0]) {
					for (let counter = 0; counter < results.data.length; counter++) {
						this.items.push({
							name: results.data[counter].name,
							id: results.data[counter].id,
							listId: results.data[counter].list_id,
							completed: results.data[counter].is_completed,
							edit: false,
						});
					}
				} else this.items = [];
			} catch (error) {
				console.log("error fetching todo lists");
				console.log(error.response);
			}
		},

		async onTransfer(currentPage, perPage) {
			this.currentPage = currentPage;
			this.perPage = perPage;
			await this.initTodosArray();
		},

		async doTask(id) {
			try {
				let task = this.items.filter((task) => task.id === id);
				task[0].completed = !task[0].completed;
				await HTTP({
					method: "PUT",
					url: `todos/${this.$route.params.id}/items/${id}`,
					data: {
						name: task[0].name,
						is_completed: task[0].completed,
					},
				});
			} catch (error) {
				console.log(error);
			}
		},

		async deleteTask(id) {
			try {
				await HTTP({
					method: "DELETE",
					url: `todos/${this.$route.params.id}/items/${id}`,
				});
				console.log("deleted ", id);
				if (!this.searching) this.initTodosArray();
			} catch (error) {
				console.log(error);
			}
		},

		async addTask() {
			try {
				if (this.newTaskName) {
					await HTTP({
						method: "POST",
						url: `todos/${this.$route.params.id}/items`,
						data: {
							name: this.newTaskName,
						},
					});

					const todos = await HTTP({
						method: "GET",
						url: `todos/${this.$route.params.id}/items`,
					});
					if (todos.data[todos.data.length - 1]) {
						this.items.push({
							name: todos.data[todos.data.length - 1].name,
							id: todos.data[todos.data.length - 1].id,
							userId: todos.data[todos.data.length - 1].user_id,
							completed: todos.data[todos.data.length - 1].is_completed,
							edit: false,
						});
					}
				}
				this.newTaskName = "";
			} catch (error) {
				console.log(error);
			}
		},

		async editTask(id) {
			try {
				this.editing = false;
				let task = this.items.filter((task) => task.id === id);
				await HTTP({
					method: "PUT",
					url: `todos/${this.$route.params.id}/items/${id}`,
					data: {
						name: this.editedTaskName,
						is_completed: task[0].is_completed,
					},
				});
				console.log("edit ", this.editedTaskName);
				this.items = this.items.filter((item) => {
					if (item.id === id) {
						item.edit = false;
						item.name = this.editedTaskName;
					}
					return item;
				});
			} catch (error) {
				console.log(error);
			}
		},

		emitToParent() {
			this.$emit("childToParent", this.listName);
		},

		async searchList() {
			try {
				if (!this.searchName) return;
				const todos = await HTTP({
					method: "GET",
					url: `todos/${this.$route.params.id}/items?name=${this.searchName}`,
				});
				if (todos.data) {
					this.searching = true;
					var newItems = [];
					for (var i = 0; i < todos.data.length; i++) {
						newItems.push({
							name: todos.data[i].name,
							id: todos.data[i].id,
							userId: todos.data[i].user_id,
							completed: todos.data[i].is_completed,
							edit: false,
						});
					}
					this.items = newItems;
				}
			} catch (error) {
				console.log(error);
			}
		},
	},

	watch: {
		searchName: async function() {
			if (!this.searchName) {
				this.searching = false;
				await this.initTodosArray();
			}
		},
	},
};
</script>
