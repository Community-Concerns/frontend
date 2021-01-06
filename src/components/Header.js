import React from 'react'; 
import { NavLink, useHistory } from 'react-router-dom'



// action
import { loggedInStatus } from '../store/ticketsAction'

// redux hook
import { useDispatch } from 'react-redux'
import { logDOM } from '@testing-library/react';



function Header(props) {

  const dispatch = useDispatch()
  const history = useHistory()

  return(
    <Header>
      {
      !props.loggedIn ? 
      <div className="header-container">
   =
        <div className="nav-container">
          <nav>
            <NavLink to="/login" activeClassName="active">Login</NavLink>
            <NavLink to="/register" activeClassName="active">Register</NavLink>
            <NavLink to="/" activeClassName="active">Join An Event</NavLink>
          </nav>
        </div>

      </div> : ((!props.isOrganizer) ?
      <div className="header-container">
        <div className="logoContainer">
        
        </div>
        <div className="nav-container">
          <nav>
            <NavLink to="/" activeClassName="active">New Ticket</NavLink>
            <button className="logout-button" onClick={() => {
                localStorage.removeItem('token')

                history.push('/login')
                dispatch(loggedInStatus(false))  
            }}>Logout</button>
          </nav>
        </div>
      </div> :
      <div className="header-container">
        <div className="logo">
        
        </div>
        <div className="nav-container">
          <nav>
            <NavLink to="/tickets" activeClassName="active">Events</NavLink>

            <NavLink to='/tickets' activeClassName='active'>Add Event</NavLink>
            <button className="logout-button" onClick={() => {
                localStorage.removeItem('token')
                history.push('/login')
                dispatch(loggedInStatus(false)) 
            }}>Logout</button>
          </nav>
        </div>
      </div>)
      }
    </Header>
  )
}

 export default Header
