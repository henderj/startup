import React from 'react';
import './login.css';

/*
  <title>Login</title>
  ...
        <li>
          <a href="../index.html">
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
        </li>
    <h1>Login</h1>
  */

export default function Login() {
  return (
    <div className="login">
      <form className="login__form" method="post" action="/login">
        <label className="login-field__label" for="username">Username</label>
        <input className="login-field__input" id="username" name="username" type="text" required />
        <label className="login-field__label" for="email">Email</label>
        <input className="login-field__input" id="email" name="email" type="email" required />
        <label className="login-field__label" for="password">Password</label>
        <input className="login-field__input" id="password" name="password" type="password" required />
        <button className="main__button" type="submit" name="action" value="login">Login</button>
        <button className="main__button" type="submit" name="action" value="register">Register</button>
      </form>
    </div>
  )
}
