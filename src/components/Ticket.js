import React from "react";
import { Link } from "react-router-dom"
import styled from "styled-components"

// action
import { deleteTicket} from "../store/ticketAction"

// redux hook
import { useDispatch } from 'react-redux'


const StyledContainer = styled.div`
  display: flex;
  background-color: #202C59;
  box-sizing: border-box;
  padding: 5%;
  min-height: 80vh;`


function Ticket({ ticketList })
{

  const dispatch = useDispatch()

  const confirmTicket = (id) =>
  {
    const result = window.confirm('Please confirm that you would like to delete this ticket')
    if (result)
    {
      dispatch(deleteTicket(id))
    }
  }
  

   

  return (
    <StyledContainer>
      {
        
        ticketList.length !== 0 ?
          ticketList.map((eachTicket) => (
            <div key={ eachTicket.id }>
              <div className="title-container">{ eachTicket.title }
                
              </div>
              
              <Link to={ `/tickets/{$eachTicket.id }` }>View</Link>
         <Link className="edit-button" to={`/tickets${eachTicket.id}`}>Edit</Link>
              <div className="delete-button" onClick={()=> confirmTicket(eachTicket.id)}>Delete</div>
            </div>
             
           
          )) :
          <div>
            
          </div>
      }
              </StyledContainer> 
   
  )
}

export default Ticket