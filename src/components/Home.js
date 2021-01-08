import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const StyledHome = styled.main`
  background-color: white;
  padding: 2% 5%;
  min-height: 80vh;
 
   `

function Home() {
  return (
 
    <StyledHome className="content-container">
    
    
      <h2 className="get-started">Community Concerns</h2>
     
        
          <div className="link-container">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
      
        
 
    </StyledHome>
      
  )
}

export default Home