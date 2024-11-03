import React from 'react';
import './join.css';
import { NavLink } from 'react-router-dom';

/*
  <title>Join QuikVote</title>
  ...
        <li>
          <a href="../index.html">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>
        </li>
    <h1>Join</h1>
  */

export default function Join() {
  return (
    <form className="join-form" method="get" action="vote.html">
      <label className="join-form__label" for="code">Enter your QuikVote code:</label>
      <input className="join-form__input" id="code" name="code" type="text" value="YBD-027" required />
      <img className="join-form__img" src="../public/icon.svg" alt="icon" />
      <p>Make sure this icon matches the QuikVote that you want to join:</p>
      <NavLink className="main__button" to="/vote">Join QuikVote</NavLink>
    </form>
  )
}
