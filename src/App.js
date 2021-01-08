import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { useSelector } from "react-redux"

//component imports
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Ticket from './components/Ticket'


import AddTicket from './components/AddTicket'
import Home from './components/Home'




function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={ Home } />
            <PrivateRoute path="/add-ticket" component={AddTicket} />
      </Switch>
    </div>
  );
}

export default App;



 