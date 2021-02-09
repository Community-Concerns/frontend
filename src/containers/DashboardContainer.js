import { connect } from "react-redux"
import Dashboard from "../components/Dashboard"
import { setMyTickets, setAllTickets, setAllUpvotes } from "../redux/actions"

const mapStateToProps = (state) => ({
	token: state.token,
	userId: state.userId,
	email: state.email,
	username: state.username,
	zipcode: state.zipcode,
	myTickets: state.myTickets,
	allTickets: state.allTickets,
	allUpvotes: state.allUpvotes
})

export default connect(mapStateToProps, { setMyTickets, setAllTickets, setAllUpvotes })(Dashboard)