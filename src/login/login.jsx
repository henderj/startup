import React from 'react';
import './login.css';

/*
  <title>Login</title>
  ...
        <li>
          <a href="../index.html">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>
        </li>
    <h1>Login</h1>
  */

export default function Login() {
  return (
    <div class="form-container">
      <form method="post" action="/login">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" name="username" type="text" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button class="button" type="submit" name="action" value="login">Login</button>
        <button class="button" type="submit" name="action" value="register">Register</button>
      </form>
    </div>
  )
}
