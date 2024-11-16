import React, { useContext, useEffect, useState } from 'react';
import './new.css';
import { NavLink } from 'react-router-dom';
import { getIconUrlFromSeed } from '../../utils'
import { UserContext } from '../../context/userContext';

export default function New() {
  useEffect(() => {
    document.title = 'New QuikVote'
  }, [])
  const { currentUser } = useContext(UserContext)
  const [copied, setCopied] = useState(false)
  const [roomCode, setRoomCode] = useState('')
  const iconUrl = getIconUrlFromSeed(roomCode)
  const navUrl = `/vote/${roomCode}`

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/room', {
        method: 'POST',
        body: JSON.stringify({ token: currentUser.token }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })

      const body = await response.json()
      if (response.status == 201) {
        setRoomCode(body.code)
      }
    }

    fetchData().catch(console.error)
  }, [])

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
            <span className={`room-code__toast ${copied ? 'room-code__toast--visible' : ''}`}>Copied</span>
          </button>
          <p className="room-code__note">Share your unique QuikVote with others!</p>
        </div>
        <NavLink className="main__button" to={navUrl}>Begin QuikVote</NavLink>
      </main>
    </>
  )
}
