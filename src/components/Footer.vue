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
						<v-col cols="12" sm="6">
							<v-menu offset-y top>
								<template v-slot:activator="{ on, attrs }">
									<div v-bind="attrs" v-on="on" class="pt-4 font-weight-medium">Tasks per page: {{ perPage }}</div>
								</template>
								<v-list>
									<v-list-item v-for="(item, index) in options" :key="index" @click.stop.prevent="changePerPage(item.perPage)">
										<v-list-item-title>{{ item.perPage }}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
						</v-col>

						<v-col cols="12" sm="6"> </v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-footer>
	</div>
</template>

<script>
import { HTTP } from "../axiosInstance";

export default {
	props: ["isTodo"],

	data() {
		return {
			currentPage: 1,
			perPage: 10,
			hasMorePages: false,
			options: [{ perPage: 5 }, { perPage: 10 }, { perPage: 15 }, { perPage: 20 }, { perPage: 25 }],
		};
	},

	methods: {
		changePerPage(val) {
			this.perPage = val;
		},

		async nextPage() {
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
	},
};
</script>
