import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom"

import Login from './pages/Login'
import Profile from './pages/Profile'
import AllGames from './pages/AllGames'
import ChooseTopic from './pages/ChooseTopic'
import SelectCards from './pages/SelectCards'
import StartGame from './pages/StartGame'
import TurnRouter from './pages/TurnRouter'


function App() {
  const [userObj, setUserObj] = useState(null)

 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login userObj={userObj} setUserObj={setUserObj} />} />
          
          <Route path="/" element={<AllGames userObj={userObj} setUserObj={setUserObj} />} />
          <Route path="/new_game" element={<StartGame />} />
          <Route path="/choose_a_topic" element={<ChooseTopic />} />
          <Route path="/select_cards" element={<SelectCards />} />

          <Route path="/play" element={<TurnRouter />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>  
      </ BrowserRouter>
    </div>
  )
}

export default App
