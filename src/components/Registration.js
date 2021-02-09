import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { StyledRegistration } from "../styling/styling"
import * as yup from "yup"
import { RegistrationValidation } from "../form_validation"
import axios from "axios"

function Registration() {
	const [form, setForm] = useState({ email: "", username: "", zipcode: "", password: "", passwordVerify: ""})
	const [disabled, setDisabled] = useState(true)
	const [errors, setErrors] = useState({ email: "", username: "", zipcode: "", password: "", passwordVerify: ""})
	const [failed, setFailed] = useState("")
	const history = useHistory()

	useEffect(() => {
		RegistrationValidation
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
		yup.reach(RegistrationValidation, name).validate(value)
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
		if (form.password !== form.passwordVerify) {
			setFailed("Password and Password Verify Do Not Match")
		} else {
			axios
				.post("https://community-concerns.herokuapp.com/api/auth/register", form)
				.then(() => {
					history.push("/login")
				})
				.catch(() => {
					setFailed("This email or username is already taken please try again")
				})
		}
	}
	return (
		<StyledRegistration>
			<div className="main-login-container">
				<div className="login-box">
					<form onSubmit={handleSubmit}>
						<div>
							<input type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="Email"/>
						</div>
						<p>{errors.email}</p>
						<div>
							<input type="text" name="username" id="username" value={form.username} onChange={handleChange} placeholder="Username"/>
						</div>
						<p>{errors.username}</p>
						<div>
							<input type="text" name="zipcode" id="zipcode" value={form.zipcode} onChange={handleChange} placeholder="Zipcode"/>
						</div>
						<p>{errors.zipcode}</p>
						<div>
							<input type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="Password"/>
						</div>
						<p>{errors.password}</p>
						<div>
							<input type="password" name="passwordVerify" id="passwordVerify" value={form.passwordVerify} onChange={handleChange} placeholder="Verify Password"/>
						</div>
						<div>
							<input disabled={disabled} type="submit" id="submit" placeholder="Login" />
						</div>
						<p>{failed}</p>
					</form>
				</div>
				<p>Already have an account? <Link to="/login">Click here to login now.</Link></p>
			</div>
		</StyledRegistration>
	)
}

export default Registration
