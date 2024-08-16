import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import FrontPage from "./FrontPage.jsx"
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>  
      <Route path="/" element={<FrontPage />}/>
      <Route path="/draw" element={<App />}/>
    </Routes>
  </BrowserRouter>,
)
