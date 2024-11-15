import React, { useEffect, useState } from 'react';
import './join.css';
import { NavLink } from 'react-router-dom';
import { getIconUrlFromSeed } from '../../utils';

export default function Join() {
  useEffect(() => {
    document.title = 'Join QuikVote'
  }, [])
  const [roomCode, setRoomCode] = useState('')
  const iconUrl = getIconUrlFromSeed(roomCode)
  const MAX_LENGTH = 4
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
        <form className="join-form">
          <label className="join-form__label" htmlFor="code">Enter your QuikVote code:</label>
          <input
            className="join-form__input"
            id="code"
            name="code"
            type="text"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
            maxLength={MAX_LENGTH}
            required />
          <img className="room-code__img join-form__img" src={iconUrl} alt="icon" />
          <p>Make sure this icon matches the QuikVote that you want to join</p>
          <NavLink className="main__button" to="/vote">Join QuikVote</NavLink>
        </form>
      </main>
    </>
  )
}
