import React from "react"
import { StyledHome } from "../styling/styling"
import { useHistory } from "react-router-dom"


function LandingPage() {
	const history = useHistory()
	return (
		<StyledHome>
			<div className="main-banner">
				<div className="banner-inner">
					<h1 className="banner-text">Welcome To Community Concerns, A Place To Improve Our Community Through Communication And Action</h1>
					<button onClick={() => history.push("/login")} className="banner-action" href="/register">Get Started!</button>
				</div>
			</div>
		</StyledHome>
	)
}

export default LandingPage