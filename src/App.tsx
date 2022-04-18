import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AuthContextProvider } from "./contexts/AuthContext";

import Home from "./pages/Home"
import NewRoom from "./pages/NewRoom"

import "../src/styles/global.scss"


function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/rooms/new" element={<NewRoom/>}/>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  ) 
}

export default App
