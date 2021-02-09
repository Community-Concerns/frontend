import { StyledHeader } from "../styling/styling"
import { NavLink, useHistory } from "react-router-dom"


function Header({ loggedIn, setLogOut }) {
	const history = useHistory()

	const logout = (e) => {
		e.preventDefault()
		setLogOut()
		history.push("/login")
	}
    
	return (
		<StyledHeader>
			<p className="nav-title">Community Concerns</p>
			<nav>
				{loggedIn === null ? (
					<ul>
						<NavLink to="/" exact={true} className="nav-link" activeClassName="active-nav">Home</NavLink>
						<NavLink to="/login" className="nav-link" activeClassName="active-nav">Login</NavLink>
						<NavLink to="/register" className="nav-link" activeClassName="active-nav">Register</NavLink>
					</ul>
				) : (
					<ul>
						<NavLink to="/dashboard" className="nav-link" activeClassName="active-nav">Dashboard</NavLink>
						<NavLink to="/create-ticket" className="nav-link" activeClassName="active-nav">Create Ticket</NavLink>
						<NavLink to="/my-tickets" className="nav-link" activeClassName="active-nav">My Tickets</NavLink>
						<NavLink to="/search" className="nav-link" activeClassName="active-nav">Search</NavLink>
						<a className="nav-link" onClick={logout}>Logout</a>
					</ul>
				)}
			</nav>
		</StyledHeader>
	)
}

export default Header
