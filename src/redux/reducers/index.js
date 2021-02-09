import { SET_USER_DATA, SET_MY_TICKETS, SET_ALL_TICKETS, SET_ALL_UPVOTES, SET_LOG_OUT } from "../actions"

const initialState = {
	email: null,
	username: null,
	zipcode: null,
	userId: null,
	myTickets: [],
	allTickets: [],
	allUpvotes: [],
	token: null
}

const Reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_USER_DATA:
		return {
			...state,
			token: action.payload.token,
			username: action.payload.username,
			zipcode: action.payload.zipcode,
			email: action.payload.email,
			userId: action.payload.userId
		}
	case SET_MY_TICKETS:
		return {
			...state,
			myTickets: action.payload
		}
	case SET_ALL_TICKETS:
		return {
			...state,
			allTickets: action.payload
		}
	case SET_ALL_UPVOTES:
		return {
			...state,
			allUpvotes: action.payload
		}
	case SET_LOG_OUT:
		return {
			email: null,
			username: null,
			zipcode: null,
			userId: null,
			myTickets: [],
			allTickets: [],
			allUpvotes: [],
			token: null
		}
	default:
		return state
	}
}

export default Reducer