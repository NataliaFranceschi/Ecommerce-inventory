import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ecommerceFetch from '../axios/config'
import '../style/login.scss'
import Logo from '../logoLaranja.png'

function Login () {
  const [user, setUser] = useState({email:"", password:""});
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

    const getToken = async (event) => {
      event.preventDefault();
      try {
        const response = await ecommerceFetch.post('/login', user);
        const { data } = response;
        
        localStorage.setItem('token', data.token);
        setErrorMessage('')
        navigate('/inventory');

      } catch (error) {
        setErrorMessage(error.response.data.message)
      }
    };

  return (
    <div className="login" onSubmit={getToken}>
        <form >
          <img src={Logo} alt='logo'/>
          <label htmlFor="email-input">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={ ({target}) => setUser({...user, email: target.value}) }
              placeholder="E-mail"
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={ ({target}) => setUser({...user, password: target.value}) }
              placeholder="Password"
            />
          </label>
          <span>{errorMessage}</span>
          <button
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
  )
}

export default Login;