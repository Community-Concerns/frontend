const initialState = {

   loggedIn: localStorage.getItem('token'),
   isFetching: false,
   submittedTickets: [],
   error: '',

}

export const eventReducer = (state = initialState, action) => {

   switch(action.type){

      case 'FETCH_TICKETS_SUCCESS':
         return {
            ...state,
            loggedIn: localStorage.getItem('token'),
            isFetching: false,
            ticketList: action.payload
         }
      
      case 'FETCH_TICKETS_FAILED':
         return {
            ...state,
            isFetching: false,
            error: action.payload
         }
      
      case 'REMOVE_TICKETS':
         return {
            ...state,
            isFetching: false,
            ticketList: state.ticketList.filter( eachTicket => {
               return eachTicket.id !== action.payload
            })
         }

      case 'ADD_EVENTS':
         return {
            ...state,
            isFetching: false,
            eventList: [...state.eventList, action.payload],
         }
      case 'UPDATE_EVENTS':
         return {
            ...state,
            isFetching: false,
            eventList: state.eventList.map(eachEvent => {
               if(eachEvent.id === action.payload.id){
                  return action.payload
               } else {
                  return eachEvent
               }
            }),
         }  
      
      case 'REMOVE_EVENTS_FAILED':
         return {
            ...state,
            isFetching: false,
            error: action.payload
         }

      case 'ADD_EVENTS_FAILED':
         return {
            ...state,
            isFetching: false,
            error: action.payload
         }

      case 'UPDATE_EVENTS_FAILED':
         return {
            ...state,
            isFetching: false,
            error: action.payload
         }
      
      case 'LOGGED_IN':
         return {
            ...state,
            loggedIn: action.payload
         }
      case 'IS_ORGANIZER':
         return {
            ...state,
            isOrganizer: action.payload
         }
      
      default:
         return state

   }

}