import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import Styled from "styled-components";



const formSchema = yup.object().shape({
	username: yup.string().min(3, "Username must be at least 3 characters").required(),
	email: yup.string().email("Must be a valid Email").required(),
	zipcode: yup
		.number().equals(5,'{Must be a valid zipcode').required(),
		
	
});

const initialFormValues = {
	username: "",
	email: "",
	zipcode:''
};
const initialErrors = {
	username: "",
	email: "",
	zipcode:''
};



export default function Register()
{
	const [formValues, s] = useState()
}

	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		formSchema.isValid(initialFormValues).then((valid) => {
			setDisabled(!valid);
		});
	}, [initialforfmValues]);

	const validateChange = (event) => {
		yup
			.reach(formSchema, event.target.name)
			.validate(event.target.value)
			.then(() => {
				setErrors({
					...errors,
					[event.target.name]: "",
				});
			})
			.catch((error) => {
				setErrors({
					...errors,
					[event.target.name]: error.errors,
				});
			});
	};

	const formSubmit = (event) => {
		event.preventDefault();
		axios
			.post('/api/auth/register', {
				email: registerForm.email.trim(),
				
				
			})
			.then(() => {
				// console.log("success!");
				setFormValues(initialFormValues);
				push("/login");
			})
			.catch((error) => {
				// console.log(error.response.data);
				alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
			});
	};

	const inputChange = (event) => {
		event.persist();
		validateChange(event);
		setFormValues({ ...formValues, [event.target.name]: event.target.value });
	};

ffreturn (
		
		<SignUpDiv>
			<h2> Sign Up </h2>
			<form onSubmit={formSubmit}>
				<label className="reg-label" htmlFor="username">
					Username&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input
					type="text"
					name="username"
					value={initialFormValues.username}
					onChange={inputChange}
				/>
				<br />
				<div className="errors">
					<div className="titleError">{errors.username}</div>
				</div>
				<br />
				<label className="signup-label" htmlFor="email">
					Email&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input type="email" name="email" value={initialFormValues.email} onChange={inputChange} />
				<br />
				<div className="errors">
					<div className="titleError">{initialerrors.email}</div>
				</div>
				<br />
				<label className="signup-label" htmlFor="phoneNumber">
					Phone&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input
					type="tel"
					name="phoneNumber"
					value={formValues.phoneNumber}
					onChange={inputChange}
				/>
				<br />
				<div className="errors">
					<div className="titleError">{errors.phoneNumber}</div>
				</div>
				<br />
				<label className="reg-label" htmlFor="password">
					Password&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input
					type="password"
					name="password"
					value={formValues.password}
					onChange={inputChange}
				/>
				<br />
				<div className="titleError">{errors.password}</div>
				<label className="signup-label" htmlFor="passwordConfirmation">
					Confirm Password&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input type="password" name="passwordConfirmation" onChange={inputChange} /> <br />
				<br />
				{formValues.passwordConfirmation !== formValues.password ? (
					<div className="titleError">{errors.passwordConfirmation}</div>
				) : null}
				<p className="form-terms-text">
					By clicking on the register button you agree with Co-Make App <br /> Terms &
					Conditions, Fair Use, forever and ever so help you God.
				</p>
				<button disabled={disabled} name="submit">
					Sign Up
				</button>
			</form>
			<Link className="already-registered-div" to="/login">
				<p className="already-registered">Already Registered?</p>
			</Link>
		</SignUpDiv>
	);
				