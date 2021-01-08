import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'


// action
import { editTicket } from '../store/ticketAction'

// redux hook
import { useDispatch } from 'react-redux'




export default function EditTicket(){
  
  const dispatch = useDispatch()
   const params = useParams()
   const history = useHistory()
   const [tickets, setTickets] = useState({
      title: "", 
      description:"",
      zipcode:""
    

   })

   useEffect(() => {
      axiosWithAuth()
         .get(`/api/tickets/${params.id}`)
         .then(res => {
            setTickets(res.data)
         })
   },[params.id])

   const handleChange = (e) => {
	   setTickets({
         ...tickets,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e) => {

      e.preventDefault()

      dispatch(editTicket(params.id, tickets))
    
      history.push('/tickets')
      
   }

  return (
      <div> className='update___events'
        <form onSubmit={handleSubmit}>
          <h1>Update Events</h1>
            <div>
              <label htmlFor='name'>Event Name</label>
            </div>
            <div>
              <input name='title' value={tickets.title} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor='date'>Date</label>
            </div>
            <div>
            
            </div>
            <div>
              <label htmlFor='time'>Time</label>
            </div>
           
            <div>
              <button type='submit'>Update</button>
            </div>
         </form>
      </div>
   )
}