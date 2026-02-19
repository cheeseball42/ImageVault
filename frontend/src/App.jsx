import './App.css'
import Gallery from './pages/gallery/Gallery'
import Login from './pages/login/Login'
import Editor from './pages/editor/Editor'
import { Navigate, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/gallery" element={<Gallery/>}/>
      <Route path="/editor" element={<Editor/>}/>

      {/** Setting up default routes */}
      <Route path="/" element={<Navigate to="/gallery" replace />}/>
      {/** Wildcard route */}
      <Route path="*" element={<Navigate to="/gallery" replace />}/>
    </Routes>
  )
}

export default App
