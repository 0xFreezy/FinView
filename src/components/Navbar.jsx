import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const navLinkClass = ({ isActive }) => isActive ? 'active' : '';

  return (
    
    <div className='navbar-layout'>
      <div className="logo">
        <p>FinView</p>
      </div>
      <div className="nav-links">
        <NavLink to='/' end className={navLinkClass}>Home</NavLink>
        <NavLink to='/stocks' className={navLinkClass}>Stocks</NavLink>
        <NavLink to='/crypto' className={navLinkClass}>Crypto</NavLink>
      </div>
    </div>
  )
}
export default Navbar