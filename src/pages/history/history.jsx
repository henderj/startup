import React from 'react';
import './history.css';
import { NavLink } from 'react-router-dom';

/*
  <title>Past QuikVotes</title>
  */

export default function History() {
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
        <h1 className="header__title header__title--center">History</h1>
      </header>
      <main className="main">
        <h3 className="username">Username: <b>noobmaster42</b></h3>
        <ol className="history-list">
          <li className="history-item">
            <h3 className="history-item__header">Winner: Star Wars</h3>
            <p className="history-item__content">Runner up(s): Lord of the Rings, Nacho Libre, (3 more)</p>
            <p className="history-item__content">Saturday, Sept 19, 2024 - 7:09 PM</p>
          </li>
          <li className="history-item">
            <h3 className="history-item__header">Winner: Secret Hitler</h3>
            <p className="history-item__content">Runner up(s): Codenames, Exploding Kittens, (7 more)</p>
            <p className="history-item__content">Thursday, Aug 22, 2024 - 6:13 PM</p>
          </li>
          <li className="history-item">
            <h3 className="history-item__header">Winner: Dogs</h3>
            <p className="history-item__content">Runner up(s): Cats</p>
            <p className="history-item__content">Monday, June 3, 2024 - 11:51 AM</p>
          </li>
          <li className="history-item">
            <h3 className="history-item__header">Winner: Dogs</h3>
            <p className="history-item__content">Runner up(s): Cats</p>
            <p className="history-item__content">Monday, June 3, 2024 - 11:51 AM</p>
          </li>
        </ol>
      </main>
    </>
  )
}
