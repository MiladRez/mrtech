import axios from "axios";

export default axios.create({
	baseURL: "https://mrtech-server.vercel.app",
	withCredentials: true,
});