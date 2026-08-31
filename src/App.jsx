import './App.css'
import Home from './pages/Home'
import Crypto from './pages/Crypto'
import Stocks from './pages/Stocks'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {


  return (

    <BrowserRouter>
      <div className='app-layout'>
        <Navbar />
        <div className="main-content">
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/stocks' element={<Stocks />} />
          <Route path='/crypto' element={<Crypto />} />



        </Routes>
      </div>
    </div>
    </BrowserRouter >


  )
}

export default App
