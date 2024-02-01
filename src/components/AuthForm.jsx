import { useContext, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import "react-toastify/dist/ReactToastify.css";
import ("./Form.css")


import { ToastContainer, toast } from "react-toastify";
const AuthForm = ({ isLogin = false }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  /* const [errorMsg, setErrorMsg] = useState()
   */
  const navigate = useNavigate()

 const { saveToken } = useContext(AuthContext)

  const handleEmail = event => setEmail(event.target.value)

  const handleSubmit = async event => {
    event.preventDefault()
    if (email.trim() === "") {
      return toast.error("Email is required");
    }

    if (password.trim() === "") {
      return toast.error("Password is required");
    }

    const reqBody = { email, password }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${isLogin ? 'login' : 'signup'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody),
        }
      )
      if (response.status === 201) {
        // The user was created successully
        navigate('/login')
      }
      if (response.status === 200) {
        // The user was logged in successully
        const parsed = await response.json()
        console.log(parsed)
        saveToken(parsed.token)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="form-wrapper">
    <ToastContainer />
    {isLogin?<h1 className="form-title">Login to your account</h1>:<h1 className="form-title">Create new account</h1>}
    <form onSubmit={handleSubmit} className="form">
      <input
        value={email}
        onChange={handleEmail}
        type="email"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button className="form-btn" type="submit">
      {isLogin ? 'Login' : 'Signup'}
      </button>
    </form>
    <div className="form-footer">
     {isLogin ?  <Link to="/signup" className="forms-link">
          Signup
        </Link> : <Link to="/login" className="forms-link">
          Login
        </Link> }
     
    </div>
  </div>


    
  )
}

export default AuthForm