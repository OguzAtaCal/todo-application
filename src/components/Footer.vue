<template>
	<div>
		<v-footer padless app>
			<v-row>
				<v-col cols="12" sm="4"></v-col>

				<v-col cols="12" sm="4" class="text-center">
					<v-btn-toggle rounded max="0" multiple class="pa-1">
						<v-btn @click="prevPage">
							<v-icon>mdi-arrow-left</v-icon>
						</v-btn>
						<v-btn>
							{{ currentPage }}
						</v-btn>
						<v-btn @click="nextPage">
							<v-icon>mdi-arrow-right</v-icon>
						</v-btn>
					</v-btn-toggle>
				</v-col>

				<v-col cols="12" sm="4" class="text-right">
					<v-row>
						<v-col cols="12" sm="4">
							<v-menu offset-y top>
								<template v-slot:activator="{ on, attrs }">
									<div v-bind="attrs" v-on="on" class="pt-4 font-weight-medium" v-if="isTodo === 'true'">
										Tasks per page: {{ perPage }}
									</div>
									<div v-bind="attrs" v-on="on" class="pt-4 font-weight-medium" v-if="isTodo !== 'true'">
										Lists per page: {{ perPage }}
									</div>
								</template>
								<v-list>
									<v-list-item v-for="(item, index) in options" :key="index" @click.stop.prevent="changePerPage(item.perPage)">
										<v-list-item-title>{{ item.perPage }}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
						</v-col>
						<v-col cols="12" sm="6" class="pt-5" v-if="isTodo === 'true'">
							<v-btn @click="deleteCompleted" color="primary"> Delete Completed Tasks </v-btn>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-footer>
	</div>
</template>

<script>
import { HTTP } from "../axiosInstance";

export default {
	props: ["isTodo", "blocked", "initPerPage"],

	data() {
		return {
			currentPage: 1,
			perPage: 0,
			hasMorePages: false,
			options: [{ perPage: 5 }, { perPage: 10 }, { perPage: 15 }, { perPage: 20 }, { perPage: 25 }],
		};
	},

	methods: {
		changePerPage(val) {
			this.perPage = val;
			if (this.isTodo === "true") {
				this.$store.dispatch("setTodoPerPage", val);
			} else {
				this.$store.dispatch("setListPerPage", val);
			}
		},

		deleteCompleted() {
			this.$emit("deleteCompleted");
		},

		async nextPage() {
			if (this.blocked) return;
			try {
				if (this.isTodo === "true") {
					await this.computeTodoPages();
					if (this.hasMorePages) this.currentPage++;
				} else {
					await this.computeTodoListPages();
					if (this.hasMorePages) this.currentPage++;
				}
			} catch (error) {
				console.log(error);
			}
		},

		async computeTodoPages() {
			try {
				const results = await HTTP({
					method: "GET",
					url: "todos/" + this.$route.params.id + `/items?limit=${this.perPage}&pageOffset=${this.currentPage + 1}`,
				});
				if (results.data[0]) this.hasMorePages = true;
				else this.hasMorePages = false;
			} catch (error) {
				console.log(error);
			}
		},

		async computeTodoListPages() {
			try {
				const results = await HTTP({
					method: "GET",
					url: `todos?limit=${this.perPage}&pageOffset=${this.currentPage + 1}`,
				});
				if (results.data[0]) this.hasMorePages = true;
				else this.hasMorePages = false;
			} catch (error) {
				console.log(error);
			}
		},

		async prevPage() {
			if (this.blocked) return;
			try {
				if (this.currentPage > 1) {
					this.currentPage--;
				}
			} catch (error) {
				console.log(error);
			}
		},

		emitToParent() {
			this.$emit("transferInfo", this.currentPage, this.perPage);
		},
	},

	watch: {
		currentPage() {
			this.emitToParent();
		},
		perPage() {
			this.emitToParent();
		},
		blocked() {
			if (this.blocked) {
				this.currentPage = 1;
			}
		},
	},

	mounted() {
		if (this.isTodo === "true") this.perPage = this.$store.state.todoPerPage;
		else this.perPage = this.$store.state.listPerPage;
	},
};
</script>
