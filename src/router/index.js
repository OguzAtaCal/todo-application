import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import TodoList from "../views/TodoList.vue";
import TodoPage from "../views/Todos.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/todo-list",
		name: "TodoList",
		component: TodoList,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/todo-list/:id",
		name: "TodoPage",
		component: TodoPage,
		meta: {
			requiresAuth: true,
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	try {
		if (to.meta.requiresAuth === true && !store.state.jwt) {
			next({ name: "Login" });
		} else if ((to.name === "Login" || to.name === "Register") && store.state.jwt) {
			next({ name: "Home" });
		} else next();
	} catch (error) {
		console.log(error);
	}
});

export default router;
