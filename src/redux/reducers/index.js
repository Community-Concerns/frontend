const initialState = {
	data: null,
	newThing: null
}

const Reducer = (state = initialState, action) => {
	switch (action.type) {
	case "EXAMPLE":
		return {
			...state,
			newThing: action.payload
		}
	}
}

export default Reducer