import React, { useState, useEffect, useHistory } from "react";
import * as yup from "yup";
import {Link} from 'react-router-dom'
import { axiosWithAuth } from "../axiosWithAuth";
// import { useDispatch } from 'react-redux'


const formSchema = yup.object().shape({
	title: yup
		.string()
		.min(3, "Title must be atleast 3 character")
		.required("A title for your issue is required"),
	
	description: yup.string().required("Description cannot be empty."),
	imageURL: yup.string().url("Must be a valid url"),
});

const initialDisabled = true;

export default function EditTicket() {
	const initialFormValues = {
		title: "",
		description: "",
		zipcode:"",
		imageURL: "",
	};
	const initialFormErrors = {
		title: "",
		description: "",
		zipcode:'',
		imageURL: "",
	};
	const [errors, setErrors] = useState(initialFormErrors);
	const [formValues, setFormValues] = useState(initialFormValues);
	const [disabled, setDisabled] = useState(initialDisabled);
	const history = useHistory();
	const params = useParams();
	const id = params.id;

	useEffect(() => {
		formSchema.isValid(formValues).then((valid) => {
			setDisabled(!valid);
		});
	}, [formValues]);

	useEffect(() => {
		axiosWithAuth()
			.get(`/api/tickets/${id}`)
			.then((response) => {
				// console.log("get edit response data", response);
				setFormValues(response.data);
			});
	}, [id]);

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
		axiosWithAuth()
			.put(`/api/tickets/${id}`, {
				title: formValues.title,
				categoryId: formValues.categoryId,
				description: formValues.description,
				imageURL: formValues.imageURL,
				// username: username,
			})
			.then((response) => {
				addTickets([response.data, ...Tickets]);
				setFormValues(initialFormValues);
				// console.log(response.data);
				getTickets();
				history.push(`/tickets/${id}`);
				// alert("Post updated!");
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

	return (
		<form>
			<p>
				<Link to={`/tickets/${id}`}>
					
				</Link>
			</p>
			<form onSubmit={formSubmit}>
				<h2>Edit Post</h2>
				<label htmlFor="title">
					{" "}
					Title:&nbsp;
					<input
						type="text"
						name="title"
						value={formValues.title}
						placeholder="What should we call this?"
						onChange={inputChange}
					/>
				</label>
				<div className="errors">
					<div className="titleError">{errors.title}</div>
				</div>
				<label htmlFor="category">
					<select onChange={inputChange} value={formValues.categoryId} name="categoryId">
						<option value="" default disabled>
							Category
						</option>
						<option value={1}>Yard and Lawn</option>
						<option value={2}>Community Activities</option>
						<option value={3}>Crime & Safety</option>
						<option value={4}>Lost & Found</option>
						<option value={5}>Recommendation</option>
						<option value={6}>Flooding</option>
						<option value={7}>General</option>
						<option value={8}>Announcements</option>
						<option value={9}>Pets</option>
						<option value={10}>Road Closure & Transportation</option>
						<option value={11}>School & Education</option>
						<option value={12}>Holiday</option>
						<option value={13}>Utilities</option>
					</select>
				</label>
				<div className="errors">
					<div className="titleError">{errors.categoryName}</div>
				</div>
				<label htmlFor="description">
					<textarea
						type="text"
						name="description"
						value={formValues.description}
						placeholder="description..."
						onChange={inputChange}
					/>
				</label>
				<div className="errors">
					<div className="titleError">{errors.description}</div>
				</div>
				<label htmlFor="imageURL">
					{" "}
					Image:&nbsp;
					<input
						type="text"
						name="imageURL"
						value={formValues.imageURL}
						placeholder="Enter URL of image"
						onChange={inputChange}
					/>
				</label>
				<br />
				<div className="errors">
					<div className="titleError">{errors.imageURL}</div>
				</div>
				<br />
				{formValues.imageURL !== null && formValues.imageURL !== "" ? (
					<img alt={formValues.title} src={`${formValues.imageURL}`} />
				) : null}
				<br />
				<button type="submit" disabled={disabled} to="/feed">
					Update
				</button>
			</form>
	</form>
	);
}