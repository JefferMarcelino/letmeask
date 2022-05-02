import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AuthContextProvider } from "./contexts/AuthContext";

import Home from "./pages/Home"
import NewRoom from "./pages/NewRoom"
import Room from './pages/Room';

import "../src/styles/global.scss"
import AdminRoom from './pages/AdminRoom';


function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/rooms/new" element={<NewRoom/>}/>
            <Route path="/rooms/:id" element={<Room/>}/>

            <Route path="/admin/rooms/:id" element={<AdminRoom/>}/>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  ) 
}

export default App
