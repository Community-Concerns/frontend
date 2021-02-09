import * as yup from "yup"

export const LoginValidation =  yup.object().shape({
	email: yup
		.string()
		.email()
		.required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
})

export const RegistrationValidation =  yup.object().shape({
	email: yup
		.string()
		.email()
		.required("Email is required"),
	username: yup
		.string()
		.min(5, "Username must be at least 5 characters")
		.required("Email is required"),
	zipcode: yup
		.string()
		.min(5, "Zipcode must be at least 5 digits long")
		.required("Zipcode is required"),
	password: yup
		.string()
		.required("Password is required"),
	passwordVerify: yup
		.string()
		.required("Password is required")
})