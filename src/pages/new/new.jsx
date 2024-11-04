import React, { useState } from 'react';
import './new.css';
import { NavLink } from 'react-router-dom';

/*
   <title>New QuikVote</title>
  */

function generateRandomRoomCode() {
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const numeric = ['2', '3', '4', '5', '6', '7', '8', '9']
  const alphanumeric = alpha.concat(numeric)

  let code = ''
  let numChars = 4

  for (let i = 0; i < numChars; i++) {
    const rand = Math.floor(Math.random() * alphanumeric.length)
    code += alphanumeric[rand]
  }
  return code
}

export default function New() {
  const [copied, setCopied] = useState(false)
  const [roomCode] = useState(generateRandomRoomCode()) // TODO: get from server
  const iconUrl = `https://api.dicebear.com/9.x/icons/svg?seed=${roomCode}`
  function copyToClipboard() {
    navigator.clipboard.writeText(roomCode)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 500);
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
        <h1 className="header__title header__title--center">Create</h1>
      </header>
      <main className="main">
        <div>
          <img src={iconUrl} alt="icon" className="room-code__img" />
          <button className="room-code" onClick={copyToClipboard}>
            <b>{roomCode}</b>
            <span className="material-symbols-outlined">content_copy</span>
            <span className={`room-code__toast ${copied ? 'room-code__toast--visible': ''}`}>Copied</span>
          </button>
          <p className="room-code__note">Share your unique QuikVote with others!</p>
        </div>
        <NavLink className="main__button" to="/vote">Begin QuikVote</NavLink>
      </main>
    </>
  )
}
