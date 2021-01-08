import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from '../auth/axiosWithAuth'
import * as yup from "yup";



const formSchema = yup.object().shape({
  username: yup.string().required('username required').min(3, "Username must be at least 3 characters"),
  email: yup
    .string()
    .required("Must be a valid Email"),
  zipcode: yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits'),
  password: yup.string().required('Password is required').min(8, 'Password needs to be 8 chars min').matches(/[A-Z]/, 'Passwords must include an uppercase letter').matches(/[a-z]/, 'Passwords must include a lowercase letter').matches(/\d/, 'Passwords must include a number').matches(/\W/, 'Passwords must include a special character')
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
        setRegisterValues({
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
	}, [registerValues]);

	

	function formSubmit(e) {

    e.preventDefault()

    axiosWithAuth()
      .post('/api/auth/register', {
        username: registerValues.username.trim(),
        password: registerValues.password.trim()
      })
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        history.push('/login')
      })
      .catch(err => {
        console.log(err)
      })
      setRegisterValues({
        username: '',
        password: '',
      })
  }

	return (
		<div>
          <div className="register-container">
            <form onSubmit={formSubmit}>
              <h1>Register</h1>
              <div>
                <input autoComplete="off" placeholder="Username" name="username" value={registerValues.username} onChange={handleChange} />
                <div className="error" style={{ color: "red" }}>{errors.username}</div>
              </div>
              <div> 
                <input autoComplete="off" name="password" placeholder="Password" type="password" value={registerValues.password} onChange={handleChange} />
                <div className="error" style={{ color: "red" }}>{errors.password}</div>
              </div>
              <div>
                  <button id="submit" disabled={disabled}>Submit</button>
              </div>
              <Link to="/login">Already Have An Account? Click Here To Login</Link>
            </form>
          </div>
        </div>
    )
	
}

export default Register