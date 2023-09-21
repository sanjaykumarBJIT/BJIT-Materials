import { useState } from 'react'
import NavBar from './components/nav_bar'
import Container from './components/container'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div>
      <NavBar/>
      <div>
        <Container/>
      </div>
    </div>
  )
}

export default App
