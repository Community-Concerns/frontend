/* eslint-disable no-unused-vars */
import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"

const PrivateRoute = ({ component: Component, data, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (localStorage.getItem("token") ? <Component {...props} /> : <Redirect to="/login" />)}
	/>
)

const mapStateToProps = (state) => ({
	user: state.data,
})

export default connect(mapStateToProps)(PrivateRoute)