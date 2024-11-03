import React from 'react';
import './new.css';
import { NavLink } from 'react-router-dom';

/*
   <title>New QuikVote</title>
  */

export default function New() {
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
        <h1 className="header__title header__title--center">Create</h1>
      </header>
      <main className="main">
        <div>
          <img src="../public/icon.svg" alt="icon" />
          <button className="room-code">
            <b>YBD-027</b>
            <span className="material-symbols-outlined">content_copy</span>
          </button>
          <p className="room-code__note">Share your unique QuikVote with others!</p>
        </div>
        <NavLink className="main__button" to="/vote">Begin QuikVote</NavLink>
      </main>
    </>
  )
}
