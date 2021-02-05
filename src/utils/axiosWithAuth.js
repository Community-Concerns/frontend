import axios from "axios"

const axiosWithAuth = () => {
	const token = localStorage.getItem("token")
	return axios.create({
		headers: {
			authorization: token,
		},
		baseURL: "https://community-concerns.herokuapp.com/",
	})
}

export default axiosWithAuth