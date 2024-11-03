import React from 'react';
import './join.css';
import { NavLink } from 'react-router-dom';

/*
  <title>Join QuikVote</title>
  */

export default function Join() {
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
        <h1 className="header__title header__title--center">Join</h1>
      </header>
      <main className="main">
        <form className="join-form" method="get" action="vote.html">
          <label className="join-form__label" for="code">Enter your QuikVote code:</label>
          <input className="join-form__input" id="code" name="code" type="text" value="YBD-027" required />
          <img className="join-form__img" src="../public/icon.svg" alt="icon" />
          <p>Make sure this icon matches the QuikVote that you want to join:</p>
          <NavLink className="main__button" to="/vote">Join QuikVote</NavLink>
        </form>
      </main>
    </>
  )
}
