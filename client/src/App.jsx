import { Routes, Route } from "react-router-dom"
import Login from './components/Login'
import Registration from './components/Registration'
import Profile from './components/Profile'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App