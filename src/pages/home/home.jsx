
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">QuikVote</h1>
        <nav>
          <ul className="header__nav-list">
            <li>
              <NavLink className="header__nav-link" to='history'>
                <span className="material-symbols-outlined">history</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="header__nav-link" to='login'>
                <span className="material-symbols-outlined">account_circle</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <NavLink className="main__button" to="/new">New QuikVote</NavLink>
        <NavLink className="main__button" to="/join">Join QuikVote</NavLink>
        <p className="home__p">
          <NavLink className="home__link" to="/login">Login/Register</NavLink> to see your past QuikVotes
        </p>
      </main>
    </>
  )
}
