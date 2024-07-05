import './App.css'
import  {useEffect} from 'react'
import { useLocation ,Navigate, Routes, Route} from 'react-router-dom'
import Login from './Login/Login'
import useVerifyUser from './Login/verifyUser'
import { useSelector } from 'react-redux'
import Home from './pages/home_sections/Home'

function App() {
  useVerifyUser()
  const user = useSelector((state) => state.user.userDetails)
  console.log(user.isActive )
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  console.log('sdecond')
  return (
    <Routes>
    <Route path="/user/auth" element={user.isActive ? <Navigate to={from} /> : <Login/>} />
      <Route path="/" element={user.isActive ? <Home /> : <Login/>} />
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  )
}

export default App
