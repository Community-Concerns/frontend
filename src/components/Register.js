import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import * as yup from "yup";
import styled from "styled-components";



const formSchema = yup.object().shape({
	username: yup.string().required().min(3, "Username must be at least 3 characters"),
	email: yup.string().required()("Must be a valid Email"),
	zipcode: yup.number().equals(5, '{Must be a valid zipcode').required(),
	password: yup.required('Password is required').min(8, 'Password needs to be 8 chars min').matches(/[A-Z]/, 'Passwords must include an uppercase letter').matches(/[a-z]/, 'Passwords must include a lowercase letter').matches(/\d/, 'Passwords must include a number').matches(/\W/, 'Passwords must include a special character')
})
		




function Register()
{
	  const history = useHistory()

	const [registerValues, setRegisterValues] = useState({
		email: "",
		username : "",
		zipcode: "",
		password: ""

	})

	const [disabled, setDisabled] = useState(true)
	const [errors, setErrors] = useState({
		username: "", password: ""
	})



const setFormErrors = (name, value) =>
    {
        yup.reach(formSchema, name).validate(value)
            .then(() => setErrors({ ...errors, [name]: '' }))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    }

    function handleChange(e)
    {
        const { value, name } = e.target
        setFormErrors(name, value)
        registerValues({
            ...registerValues,
            [name]: value
        })
    }











	useEffect
		(() =>
	{
		formSchema.isValid(registerValues).then((valid) =>
		{
			setDisabled(!valid);
		});
	}, [,]);

	const validateChange = (event) =>
	{
		yup
			.reach(formSchema, event.target.name)
			.validate(event.target.value)
			.then(() =>
			{
				setErrors({
					...errors,
					[event.target.name]: "",
				});
			})
			.catch((error) =>
			{
				setErrors({
					...errors,
					[event.target.name]: error.errors,
				});
			});
	};

	const formSubmit = (event) =>
	{
		event.preventDefault();
		axios
			.post('/api/auth/register', {
				email: registerValues.email.trim(),
				
				
			})
			.then(() =>
			{
				// console.log("success!");
				setRegisterValues();
				history.push("//api/auth/login");
			})
			.catch((error) =>
			{
				// console.log(error.response.data);
				alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
			});
	};

	const inputChange = (event) =>
	{
		event.persist();
		validateChange(event);
		setRegisterValues({ ...registerValues, [event.target.name]: event.target.value });
	};

	return (
		
		<SignUpDiv>
			<h2> Sign Up </h2>
			<form onSubmit={ formSubmit }>
				<label className="reg-label" htmlFor="username">
					Username&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input
					type="text"
					name="username"
					value={ initialFormValues.username }
					onChange={ inputChange }
				/>
				<br />
				<div className="errors">
					<div className="titleError">{ errors.username }</div>
				</div>
				<br />
				<label className="signup-label" htmlFor="email">
					Email&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input type="email" name="email" value={ initialFormValues.email } onChange={ inputChange } />
				<br />
				<div className="errors">
					<div className="titleError">{ initialerrors.email }</div>
				</div>
				<br />
				<label className="signup-label" htmlFor="phoneNumber">
					Phone&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input
					type="tel"
					name="phoneNumber"
					value={ formValues.phoneNumber }
					onChange={ inputChange }
				/>
				<br />
				<div className="errors">
					<div className="titleError">{ errors.phoneNumber }</div>
				</div>
				<br />
				<label className="reg-label" htmlFor="password">
					Password&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input
					type="password"
					name="password"
					value={ formValues.password }
					onChange={ inputChange }
				/>
				<br />
				<div className="titleError">{ errors.password }</div>
				<label className="signup-label" htmlFor="passwordConfirmation">
					Confirm Password&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input type="password" name="passwordConfirmation" onChange={ inputChange } /> <br />
				<br />
				{ formValues.passwordConfirmation !== formValues.password ? (
					<div className="titleError">{ errors.passwordConfirmation }</div>
				) : null }
				<p className="form-terms-text">
					By clicking on the register button you agree with Co-Make App <br /> Terms &
					Conditions, Fair Use, forever and ever so help you God.
				</p>
				<button disabled={ disabled } name="submit">
					Sign Up
				</button>
			</form>
			<Link className="already-registered-div" to="/login">
				<p className="already-registered">Already Registered?</p>
			</Link>
		</SignUpDiv>
	);
}