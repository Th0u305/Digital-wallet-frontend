import { Outlet } from 'react-router'
import './index.css'
import Footer from './components/layout/Footer'
import { NavbarMenu } from './components/layout/Navbar'


function App() {

  return (
    <>
      <NavbarMenu/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
