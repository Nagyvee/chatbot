import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Login/Login'

function App() {

  return (
  <Router>
    <Routes>
      <Route path="/user/auth" element={<Login />} />
      <Route path="/profile" element={<h2>Welcome user</h2>} />
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  </Router>
  )
}

export default App
