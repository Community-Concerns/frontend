const initialState = {

   loggedIn: localStorage.getItem('token'),
   isFetching: false,
   ticketList: [],
   error: '',

}

export const ticketReducer = (state = initialState, action) => {

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

      case 'ADD_TICKETS':
         return {
            ...state,
            isFetching: false,
            ticketList: [...state.eventList, action.payload],
         }
      case 'UPDATE_TICKETS':
         return {
            ...state,
            isFetching: false,
            ticketList: state.ticketList.map(eachTicket => {
               if(eachTicket.id === action.payload.id){
                  return action.payload
               } else {
                  return eachTicket
               }
            }),
         }  
      
      case 'REMOVE_TICKETS_FAILED':
         return {
            ...state,
            isFetching: false,
            error: action.payload
         }

      case 'ADD_TICKETS_FAILED':
         return {
            ...state,
            isFetching: false,
            error: action.payload
         }

      case 'UPDATE_TICKETS_FAILED':
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
     
      
      default:
         return state

   }

}