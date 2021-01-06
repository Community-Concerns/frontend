import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

// action
import { addTicket } from '../store/ticketsAction'

// Redux hook
import { useDispatch } from 'react-redux'

const StyledTicket = styled.div` 
background-color: #202C59;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  `

function AddEvent() {

  const dispatch = useDispatch()

   const history = useHistory()
   const [tickets, setTickets] = useState({
      title: '',
      description:'',
      zipcode: '',
    //   image: '',
   })

   const handleChange = (e) => {
      setTickets({
         ...tickets,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      dispatch(addTicket(tickets))

      history.push('/tickets')
   }

  return (
    <StyledTicket>
      <form onSubmit={handleSubmit}>
        <h1>New Ticket</h1>
        <div>
          <input name='title' placeholder="" value={tickets.title} onChange={handleChange} />
        </div>
        <div>
          <input name='description' placeholder="Please give a description" value={tickets.description} onChange={handleChange} />
        </div>
        <div>
          <input name='zipcode' placeholder="Your Zipcode" value={tickets.zipcode} onChange={handleChange} />
        </div>
        {/* <div>
          <input name='image' placeholder="Upload Image " value={events.location} onChange={handleChange} />
        </div> */}
        <div>
          <button type='submit'>Submit Ticket</button>
        </div>
      </form>
    </StyledTicket>
  )
}

export default AddEvent
