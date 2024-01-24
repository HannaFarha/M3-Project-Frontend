//import { useContext } from 'react'
import { Link } from 'react-router-dom'
//import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
  //const { isAuthenticated, logout } = useContext(AuthContext)

  return (
    <nav>
            <h1> hello</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
       
      </ul>
    </nav>
  )
}

export default Navbar