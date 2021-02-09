import { Route, Switch } from "react-router-dom"
import HeaderContainer from "../containers/HeaderContainer"
import LoginContainer from "../containers/LoginContainer"
import DashboardContainer from "../containers/DashboardContainer"
import LandingPage from "./LandingPage"
import Registration from "./Registration"
import PrivateRoute from "../utils/PrivateRoute"

const App = () => (
	<div>
		<HeaderContainer />
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route exact path="/login" component={LoginContainer} />
			<Route exact path="/register" component={Registration} />
			<PrivateRoute exact path="/dashboard" component={DashboardContainer} />
		</Switch>
	</div>
)

export default App
