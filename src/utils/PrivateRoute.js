/* eslint-disable no-unused-vars */
import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"

const PrivateRoute = ({ component: Component, token, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (token ? <Component {...props} /> : <Redirect to="/login" />)}
	/>
)

const mapStateToProps = (state) => ({
	token: state.token,
})

export default connect(mapStateToProps)(PrivateRoute)