import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route, Routes } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Addfeedback from './components/Addfeedback'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Addfeedback/>}/>

      </Routes>
    </>
  )
}

export default App
