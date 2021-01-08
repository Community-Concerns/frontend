import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

//component imports
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Ticket from './components/Ticket'


import AddTicket from './components/AddTicket'
import Home from './components/Home'
import { fetchTickets } from './store/ticketAction';






function App()
{
  const dispatch = useDispatch()

  const [
    loggedIn, 
    ticketList ]= useSelector(state => [
      state.loggedIn,
      state.ticketList])
  
  useEffect(() =>
  {
    
    dispatch(fetchTickets())
    
  },[dispatch])
  
  return (
    <div className="App">
      <Header />
      loggedIn={loggedIn}
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={ Home } />
           
      </Switch>
    </div>
  );
}

export default App;



 