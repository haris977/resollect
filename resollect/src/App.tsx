import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Drawer from './Components/Drawer/Drawer'
import PortfolioPage from './Components/PortfolioPage/PortfolioPage'
import Vacant from './Components/Vacant/Vacant'
import { UploadDrawer } from './Components/UploadDrawer/UploadDrawer'

function App() {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar/>
      <Drawer onDataUploadClick={() => setUploadOpen(true)}/>
      <UploadDrawer open={uploadOpen} onOpenChange={setUploadOpen} />
      <Routes>
      <Route path="/" element={<Navigate to="/portfolio" replace />} />
      <Route element={<PortfolioPage/>} path='/portfolio'/>
      <Route element={<Vacant/>} path='/vacant'/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
