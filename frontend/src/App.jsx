import React from "react"
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Navbar from "./components/layout/Navbar"
import Statscard from "./components/main/Statscard"
import {ToastContainer} from 'react-toastify';

function App() {

  return (
    <>
     <ToastContainer position="top-right"/>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Statscard/>}/>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
