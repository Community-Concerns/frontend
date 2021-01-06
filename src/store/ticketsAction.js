import { axiosWithAuth } from '../axiosWithAuth'

export const fetchTickets = () => {

   return dispatch => {

      axiosWithAuth()
         .get('/api/tickets')
         .then(res => {
            dispatch({
               type: 'FETCH_TICKETS_SUCCESS', payload: res.data
            })
         })
         .catch(err => {
            dispatch({ type: 'FETCH_TICKETS_FAILED', payload: err })
         })
   }
}

export const addTicket = (tickets) => {

   return dispatch => {

      axiosWithAuth()
         .post('/api/tickets', tickets)
         .then(res => {
            dispatch({
               type: 'ADD_TICKETS', payload: res.data
            })
         })
         .catch(err => {
            dispatch({ type: 'ADD_TICKETS_FAILED', payload: err })
         })
   }

}

export const deleteEvent = (id) => {

   return dispatch => {

      axiosWithAuth()
         .delete(`/api/tickets/${id}`)
         .then(res => {
            dispatch({
               type: 'REMOVE_EVENTS', 
               payload: id
            })
         })
         .catch(err => {
            dispatch({ type: 'REMOVE_TICKETS_FAILED', payload: err })
         })
   }
   
}

export const editTicket = (id, tickets) => {

   return dispatch => {

      axiosWithAuth()
         .put(`/api/tickets/${id}`, tickets)
         .then(res => {
            console.log(res)
            dispatch({
               type: 'UPDATE_TICKETS',
               payload: res.data, 
            })
         })
         .catch(err => {
            dispatch({ type: 'UPDATE_TICKETS_FAILED', payload: err })
         })
   }

}

export const loggedInStatus = (status) => {

   return {type: 'LOGGED_IN', payload: status}

}

