import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';

/*
  <title>Login</title>
  */

export default function Login() {
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
          < form className="login__form" method="post" action="/login" >
            <label className="login-field__label" for="username">Username</label>
            <input className="login-field__input" id="username" name="username" type="text" required />
            <label className="login-field__label" for="email">Email</label>
            <input className="login-field__input" id="email" name="email" type="email" required />
            <label className="login-field__label" for="password">Password</label>
            <input className="login-field__input" id="password" name="password" type="password" required />
            <button className="main__button" type="submit" name="action" value="login">Login</button>
            <button className="main__button" type="submit" name="action" value="register">Register</button>
          </form >
        </div >
      </main >
    </>
  )
}
