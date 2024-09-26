import React                                        from 'react'
import ReactDOM                                     from 'react-dom/client'
import './index.css'
import App                                          from './App'
import { BrowserRouter as Router, Routes, Route }   from 'react-router-dom'
import Home                                         from './pages/Home'
import "typeface-montserrat"
import "typeface-roboto"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router> 
      <Routes>
        <Route exact    path="/"        element={<App />} />
        <Route          path="/home"    element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>
)

