import Home from "./pages/Home"
import NewRoom from "./pages/NewRoom"
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import "../src/styles/global.scss"

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/rooms/new" element={<NewRoom/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
