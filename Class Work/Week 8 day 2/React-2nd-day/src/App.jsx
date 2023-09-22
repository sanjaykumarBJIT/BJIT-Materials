import { useState } from 'react'
import Nav_bar from './components/nav_bar/nav_bar'
import './App.css'
import Container from './components/body/container'

function App() {

  return (
    <>
      <div>
        <Nav_bar />
      </div>
      <div>
        <Container />
      </div>
    </>

  )
}

export default App
