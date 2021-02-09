import { connect } from "react-redux"
import Header from "../components/Header"
import { setLogOut } from "../redux/actions"

const mapStateToProps = (state) => ({
	loggedIn: state.username,
})

export default connect(mapStateToProps, { setLogOut })(Header)