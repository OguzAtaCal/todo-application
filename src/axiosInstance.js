import axios from "axios";
import store from "./store/index";

const HTTP = axios.create({
	baseURL: `http://localhost:3030/`,
	headers: {
		Authorization: "Bearer " + store.state.jwt.data,
	},
});

HTTP.interceptors.request.use((config) => {
	const token = store.state.jwt.data;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	else config.headers.Authorization = "";
	return config;
});

export { HTTP };
