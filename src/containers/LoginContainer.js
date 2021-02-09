import { connect } from "react-redux"
import Login from "../components/Login"
import { setUserData } from "../redux/actions"

export default connect(null, { setUserData })(Login)
