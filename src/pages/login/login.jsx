import React, { useContext, useEffect, useState } from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { MessageDialog } from './messageDialog'

export default function Login() {
  useEffect(() => {
    document.title = 'Login'
  }, [])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [displayError, setDisplayError] = React.useState(null);

  const { currentUser, setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  async function register(event) {
    event.preventDefault()
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    const body = await response.json();
    if (response.status == 201) {
      setCurrentUser({ username })
      navigate('/')
    } else {
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  async function login(event) {
    event.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    const body = await response.json();
    if (response.status == 200) {
      setCurrentUser({ username })
      navigate('/')
    } else {
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  async function logout(event) {
    event.preventDefault()
    const response = await fetch('/api/logout', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    if (response.status == 204) {
      setCurrentUser(null)
      // navigate('/')
    } else {
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <header className="header header--center-with-back">
        <nav>
          <ul className="header__nav-list">
            <li>
              <NavLink className="header__nav-link" to="/">
                <span className="material-symbols-outlined">arrow_back</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <h1 className="header__title header__title--center">Login</h1>
      </header>
      <main className="main">
        <div className="login">
          <form className="login__form">
            {currentUser && (
              <>
                <p>Username: <b>{currentUser.username}</b></p>
                <button
                  className="main__button"
                  name="action"
                  value="register"
                  onClick={logout}
                >Logout</button>
              </>
            )}
            {!currentUser && (
              <>
                <label className="login-field__label" htmlFor="username">Username</label>
                <input
                  className="login-field__input"
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required />
                <label className="login-field__label" htmlFor="password">Password</label>
                <input
                  className="login-field__input"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required />
                <button
                  className="main__button"
                  onClick={login}>Login</button>
                <button
                  className="main__button"
                  onClick={register}>Register</button>
              </>
            )}
          </form>
        </div>
      </main >

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  )
}
