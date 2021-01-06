import React, { useEffect } from 'react';

//Components
import Register from './components/Register'
import Ticket from './components/Ticket'
import Login from './components/Login'
import Header from './components/Header'
import AddTicket from './components/AddTicket'
import Landing from './components/LandingPage/Landing'


//Utils
import { Route, Switch } from 'react-router-dom'

// action
import { fetchTickets } from './store/ticketsAction'

// Redux
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()

  const [
    loggedIn, submittedTickets] = useSelector( state => 
    [
      state.loggedIn, 
      state.submittedTickets
    ])
  
  console.log(
    'LOGGED_IN STATUS: \n', loggedIn, 
    '\n\n SUBMITTED_TICKET STATUS:\n', submittedTickets
  )
  
  useEffect(() => {
    
    dispatch(fetchTickets())
    
  },[dispatch, ])


  return (
    <div className="App">
      <Header 
        loggedIn={loggedIn} 
        />

      <Switch>

        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/api/auth/register">
          <Register />
        </Route>

       



        <Route exact path="/api/auth/login">
          <Login />
        </Route>


    

        <Route exact path='/api/tickets'>
          <AddTicket />
        </Route>  

        <Route exact path='/api/tickets/my_tickets'> 
          <Ticket /> 
        </Route>

      </Switch>
    </div>
  );
}


export default App;
