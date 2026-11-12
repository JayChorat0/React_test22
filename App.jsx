import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Add from './component/Add'
import Edit from './component/Edit'
import Show from './component/Show'
import Navbar from './component/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/add' element={ <Add/> } />
          <Route path='/edit/:id' element={ <Edit /> } />
          <Route path='/:id' element={ <Show /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
