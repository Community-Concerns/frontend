export const SET_MY_TICKETS = "SET_MY_TICKETS"
export const SET_ALL_TICKETS = "SET_ALL_TICKETS"
export const SET_ALL_UPVOTES = "SET_ALL_UPVOTES"
export const SET_USER_DATA = "SET_USER_DATA"
export const SET_LOG_OUT = "SET_LOG_OUT"

// Save token
export const setUserData = (user) => ({
	type: SET_USER_DATA,
	payload: user,
})

// Set User Tickets
export const setMyTickets = (tickets) => ({
	type: SET_MY_TICKETS,
	payload: tickets,
})

// Set All Tickets
export const setAllTickets = (tickets) => ({
	type: SET_ALL_TICKETS,
	payload: tickets,
})

// Set All Upvotes
export const setAllUpvotes = (upvotes) => ({
	type: SET_ALL_UPVOTES,
	payload: upvotes,
})

export const setLogOut = () => ({
	type: SET_LOG_OUT
})

