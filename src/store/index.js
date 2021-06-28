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
	},
	mutations: {
		storeToken(state, jwt) {
			state.jwt = jwt;
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
	},
	plugins: [vuexLocal.plugin],
});
