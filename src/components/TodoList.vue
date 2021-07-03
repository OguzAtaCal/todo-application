<template>
	<div>
		<v-list dense rounded>
			<div v-for="item in items" :key="item.id">
				<v-list-item v-if="!item.edit && item.active" :to="`/todo-list/${item.id}`">
					<v-list-item-content>
						<v-list-item-title v-text="item.name"></v-list-item-title>
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

								<v-list-item @click.stop="deleteList(item.id)">
									<v-list-item-icon class="mr-3">
										<v-icon small>mdi-delete</v-icon>
									</v-list-item-icon>
									<v-list-item-content class="mr-3">Delete</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-list-item-action>

					<v-list-item-action>
						<v-btn disabled style="width:10px;" small>
							{{ item.taskCount }}
						</v-btn>
					</v-list-item-action>
				</v-list-item>
				<v-text-field
					class="pt-3 pb-3"
					v-if="item.edit"
					v-model="editedListName"
					hide-details
					label="Rename list"
					outlined
					append-icon="mdi-pen"
					@click:append="editList(item.id)"
					@keydown.enter.prevent="editList(item.id)"
				>
				</v-text-field>
			</div>
			<v-text-field
				v-if="!!items.length"
				hide-details
				label="Search for a list"
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
				v-model="newListName"
				outlined
				label="Add a new list"
				append-icon="mdi-plus"
				@click:append="addList"
				@keydown.enter.prevent="addList"
			></v-text-field>
		</v-list>

		<Footer v-on:transferInfo="onTransfer" isTodo="false" />
	</div>
</template>

<script>
import { HTTP } from "../axiosInstance";
import Footer from "@/components/Footer.vue";

export default {
	components: {
		Footer,
	},

	data: () => ({
		editing: false,
		newListName: null,
		editedListName: null,
		searchName: null,
		items: [],
		currentPage: 1,
		perPage: 10,
		hasData: false,
	}),

	watch: {
		searchName: function() {
			if (this.searchName === "" || !this.searchName) {
				for (let counter = 0; counter < this.items.length; counter++) {
					this.items[counter].active = true;
				}
			}
		},
	},

	methods: {
		showTextField(id) {
			if (!this.editing) {
				this.items = this.items.filter((item) => {
					if (item.id === id) {
						this.editing = true;
						this.editedListName = item.name;
						item.edit = true;
					}
					return item;
				});
			}
		},

		async initData() {
			const results = await HTTP({
				method: "GET",
				url: `todos?limit=${this.perPage}&pageOffset=${this.currentPage}`,
			});
			if (results.data[0]) {
				this.hasData = true;
			} else this.hasData = false;
		},

		async initArray() {
			this.items = [];
			try {
				const results = await HTTP({
					method: "GET",
					url: `todos?limit=${this.perPage}&pageOffset=${this.currentPage}`,
				});
				console.log(results.data);
				await this.initData();
				if (results.data[0]) {
					console.log(results.data);
					for (let counter = 0; counter < results.data.length; counter++) {
						this.items.push({
							name: results.data[counter].name,
							id: results.data[counter].id,
							userId: results.data[counter].user_id,
							taskCount: 0,
							edit: false,
							active: true,
						});
					}
				} else console.log(results);
			} catch (error) {
				console.log("error fetching todo lists");
				console.log(error.response);
			}
		},

		async onTransfer(currentPage, perPage) {
			this.currentPage = currentPage;
			this.perPage = perPage;
			await this.initArray();
		},

		async deleteList(id) {
			try {
				await HTTP({
					method: "DELETE",
					url: "todos/" + id,
				});
				console.log("deleted ", id);
				this.items = this.items.filter((item) => item.id !== id);
			} catch (error) {
				console.log(error);
			}
		},
		async addList() {
			try {
				if (this.newListName) {
					await HTTP({
						method: "POST",
						url: "todos",
						data: {
							name: this.newListName,
						},
					});

					const todoLists = await HTTP({
						method: "GET",
						url: "todos",
					});
					if (todoLists.data[0]) {
						this.items.push({
							name: todoLists.data[todoLists.data.length - 1].name,
							id: todoLists.data[todoLists.data.length - 1].id,
							userId: todoLists.data[todoLists.data.length - 1].user_id,
							taskCount: 0,
							edit: false,
							active: true,
						});
					}
				}
				this.newListName = "";
			} catch (error) {
				console.log(error);
			}
		},
		async editList(id) {
			try {
				this.editing = false;
				const result = await HTTP({
					method: "PUT",
					url: "todos/" + id,
					data: {
						name: this.editedListName,
					},
				});
				console.log("edit ", this.editedListName);
				console.log(result);
				this.items = this.items.filter((item) => {
					if (item.id === id) {
						item.edit = false;
						item.name = this.editedListName;
					}
					return item;
				});
			} catch (error) {
				console.log(error);
			}
		},

		searchList() {
			for (let counter = 0; counter < this.items.length; counter++) {
				if (this.searchName === "") this.items[counter].active = true;
				else {
					if (!this.items[counter].name.includes(this.searchName)) this.items[counter].active = false;
				}
			}
		},
	},

	async created() {
		await this.initArray();
	},
};
</script>
