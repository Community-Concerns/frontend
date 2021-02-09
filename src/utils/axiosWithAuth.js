import axios from "axios"
import { connect } from "react-redux"

const axiosWithAuth = ({ token }) => {
	return axios.create({
		headers: {
			authorization: token,
		},
		baseURL: "https://community-concerns.herokuapp.com/",
	})
}

const mapStateToProps = (state) => ({
	token: state.token,
})

export default connect(mapStateToProps)(axiosWithAuth)