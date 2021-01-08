import React, { useState} from "react";
import { useHistory} from "react-router";
import Styled from "styled-components";
import * as yup from "yup";
import { axiosWithAuth } from "../auth/axiosWithAuth";
import schema from "./yupLoginValidation"
import { Link } from "react-router-dom"

// action

import { loggedInStatus } from "../store/ticketAction";
import {useDispatch} from "react-redux"

const LoginDiv = Styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-top: 150px;
	@media (max-width: 450px) {
		margin-top: 110px;
    }
button {
    width: 100px;
    height: 2.6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 7px;
    background-color: #3184ed;
	font-weight: 500;
	font-size: 1rem;
    color: white;
    cursor: pointer;
    margin: 10% auto;
    border: unset;
}
button:hover  {
	background-color: white;
	color: #3184ed;
	cursor: pointer;
    };
button:disabled {
		background-color: lightgray;
		cursor: not-allowed;
    };
input[type="text"], input[type="password"] {
    text-align: center;
    border: unset;
    border-radius: 10px;
    height: 2rem;
    width:100%;
    background-color: #ffffff;
    font-size: 1.2rem;
	}
.sign-up-div {
	display: flex;
	justify-content: center;
}
p.sign-up {
	width: 15%;
    font-size: .8rem;
	color: crimson;
	position: absolute;
	margin: 0 auto;
	vertical-align: center;
	z-index: 0;
	@media (max-width: 450px) {
		width: 50%;
    }
}
p.sign-up:hover {
    font-size: 1rem;
    color: #3184ed;
}
.errors {
	font-size: .9rem;
}
.titleError {
	color: crimson;
	margin: 0 auto;
}
h2 {
	color: #3184ed;
}
`;



const initialFormValues = {
	username: "",
	password: "",
};
const initialErrors = {
	username: "",
	password: "",
};


export default function Login()
{
      const dispatch = useDispatch()
	const [credentials, setCredentials] = useState(initialFormValues);
	const [errors, setErrors] = useState(initialErrors);
	const [disabled, setDisabled] = useState(true);
	let history = useHistory();

	const handleChange = (evt) =>
    {
        const { name, value } = evt.target;
        validate(name, value);
        setCredentials({ ...credentials, [name]: value });
    };


	const onSubmit = (event) => {
		event.preventDefault();
		axiosWithAuth()
			.post("/api/auth/login", credentials)
			.then((response) => {
				localStorage.setItem("token", response.data.token);
                localStorage.setItem("organizer", true);
                dispatch(loggedInStatus(true))
                setCredentials(initialFormValues)
                history.push("/my_tickets");
            })
	};
	const validate = (name, value) =>
    {
        yup
            .reach(schema, name)
            .validate(value)
            .then((valid) =>
            {
                setErrors({
                    ...errors,
                    [name]: "",
                });
                
            })

            .catch((err) =>
            {
                setErrors({
                    ...errors,
                    [name]: err.errors[0],
                });
                const submitBtnStyle = document.querySelector('#submit')
                submitBtnStyle.classList.add('disabled')
                setDisabled(true)
            });
    };
	

	return (
		<LoginDiv>
			<h2>Login</h2>
			<form className="login-form" onSubmit={onSubmit}>
				<label htmlFor="email"></label>
				<br />
				<input
					type="text"
					name="email"
					placeholder="username or email"
					value={credentials.username}
				
				/>
				<br />
				<div className="errors">
					<div className="titleError">{errors.username}</div>
				</div>
				<br />
				<label htmlFor="zipcode"></label>
				<br />
				<input
					type="password"
					name="password"
					placeholder="password"
					value={credentials.password}
					onChange={handleChange}
				/>
				<br />
				<div className="errors">
					<div className="titleError">{errors.password}</div>
				</div>
				<button disabled={disabled} name="submit">
					Login
				</button>
				<Link className="sign-up-div" to="/">
					<p className="sign-up"> Sign-up instead </p>
				</Link>
				<br />
			</form>
		</LoginDiv>
	);
}