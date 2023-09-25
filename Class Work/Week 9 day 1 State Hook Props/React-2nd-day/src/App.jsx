import { useState } from 'react'
import Nav_bar from './components/nav_bar/nav_bar'
import './App.css'
import Container from './components/body/container'

function App() {

  const bookData = [
    {
      id:1,
      name: "Berserk",
      price: 9.99,
      shortDescription: "The greatest manga of all time",
      imageLink: "https://m.media-amazon.com/images/M/MV5BNDU0OGY4ZjUtZDFmMS00Y2M1LTg5NTUtYjRiZTY0OTdjYWFmXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
    },
    {
      id:2,
      name: "The alchemist",
      price: 24.99,
      shortDescription: "Story rich.",
      imageLink: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg"
    },
    {
      id:3,
      name: "Harry Potter",
      price: 14.99,
      shortDescription: "Compact and easy to use.",
      imageLink: "https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id:4,
      name: "The Lord Of the Rings",
      price: 29.99,
      shortDescription: "A story that is set in the medieval fantasy world.",
      imageLink: "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id:5,
      name: "Hamlet",
      price: 39.99,
      shortDescription: "A story of tragedy.",
      imageLink: "https://m.media-amazon.com/images/I/51IWerpjMGL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id:5,
      name: "Gitanjali",
      price: 9.99,
      shortDescription: "A timeless classic",
      imageLink: "https://m.media-amazon.com/images/I/911E0+uRMSL._AC_UF1000,1000_QL80_.jpg"
    }
  ];

  return (
    <>
      <div>
        <Nav_bar />
      </div>
      <div>
        <Container bookData={bookData}/>
      </div>
    </>

  )
}

export default App
