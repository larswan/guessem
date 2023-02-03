import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom"

import Login from './pages/Login'
import Profile from './pages/Profile'
import Test from './pages/Test'
import AllGames from './pages/AllGames'
import ChooseTopic from './pages/ChooseTopic'
import SelectCards from './pages/SelectCards'
import StartGame from './pages/StartGame'
import TurnRouter from './pages/TurnRouter'


function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<AllGames />} />
          <Route path="/new_game" element={<StartGame />} />
          <Route path="/choose_a_topic" element={<ChooseTopic />} />
          <Route path="/select_cards" element={<SelectCards />} />

          <Route path="/play" element={<TurnRouter />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<Test />} />
        </Routes>  
      </ BrowserRouter>
    </div>
  )
}

export default App
