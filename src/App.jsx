import { useState } from 'react'
import './App.css'
import Navbar from './conponents/Navbar'
import Manger from './conponents/Manger'
import Footer from './conponents/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
    <Navbar></Navbar>
    <div className="min-h-[87vh]">
     <Manger></Manger>
     </div>
     <Footer></Footer>
      
    </>
  )
}

export default App
