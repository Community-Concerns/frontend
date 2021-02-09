import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { StyledLogin } from "../styling/styling"
import * as yup from "yup"
import { LoginValidation } from "../form_validation"
import axios from "axios"

function Login({ setUserData }) {
	const [form, setForm] = useState({ email: "", password: ""})
	const [disabled, setDisabled] = useState(true)
	const [errors, setErrors] = useState({ email: "", password: "" })
	const [failed, setFailed] = useState("")
	const history = useHistory()


	useEffect(() => {
		LoginValidation
			.isValid(form)
			.then((valid) => {
				const submitButton = document.querySelector("#submit")
				if (!valid) {
					submitButton.classList.add("disabled")
				} else {
					submitButton.classList.remove("disabled")
				}
				setDisabled(!valid)
			})
	}, [form])

	const setFormErrors = (name, value) => {
		yup.reach(LoginValidation, name).validate(value)
			.then(() => setErrors({ ...errors, [name]: "" }))
			.catch((err) => setErrors({ ...errors, [name]: err.errors[0] }))
	}

	const handleChange = (e) => {
		const {name, value} = e.target
		setFormErrors(name, value)
		setForm({
			...form,
			[name]: value
		})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		axios
			.post("https://community-concerns.herokuapp.com/api/auth/login", form)
			.then((res) => {
				// Save json token and data to redux
				setUserData(res.data)
				history.push("/dashboard")
			})
			.catch(() => {
				setFailed("Sorry the email and password combination failed")
			})
	}

	return (
		<StyledLogin>
			<div className="main-login-container">
				<div className="login-box">
					<form onSubmit={handleSubmit}>
						<div>
							<input type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="Email"/>
						</div>
						<p>{errors.email}</p>
						<div>
							<input type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="Password"/>
						</div>
						<p>{errors.password}</p>
						<div>
							<input disabled={disabled} type="submit" id="submit" placeholder="Login" />
						</div>
						<p>{failed}</p>
					</form>
				</div>
				<p>Don&apos;t have an account? <Link to="/register">Click here to register now.</Link></p>
			</div>
		</StyledLogin>
	)
}

export default Login
