import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
});

export default new Vuex.Store({
	state: {
		jwt: "",
		todoPerPage: 10,
		listPerPage: 10,
	},
	mutations: {
		storeToken(state, jwt) {
			state.jwt = jwt;
		},
		setTodoPerPage(state, todoPerPage) {
			state.todoPerPage = todoPerPage;
		},
		setListPerPage(state, listPerPage) {
			state.listPerPage = listPerPage;
		},
		resetToken(state) {
			state.jwt = "";
		},
	},
	actions: {
		storeToken(context, jwt) {
			context.commit("storeToken", jwt);
		},
		resetToken(context) {
			context.commit("resetToken");
		},
		setTodoPerPage(context, todoPerPage) {
			context.commit("setTodoPerPage", todoPerPage);
		},
		setListPerPage(context, listPerPage) {
			context.commit("setListPerPage", listPerPage);
		},
	},
	plugins: [vuexLocal.plugin],
});
