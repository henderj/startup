import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function Home() {
  useEffect(() => {
    document.title = 'QuikVote'
  }, [])
  const { currentUser } = useContext(UserContext)
  const [randomCard, setRandomCard] = useState('')
  useEffect(() => {
    const fetchFact = async () => {
      const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/draw/?count=1')
      if (response.status == 200) {
        const body = await response.json()
        const card = body.cards[0]
        setRandomCard(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
      }
    }
    fetchFact().catch(console.error)
  }, [])
  return (
    <>
      <header className="header">
        <h1 className="header__title">QuikVote</h1>
        <nav>
          <ul className="header__nav-list">
            {currentUser && (
              <li>
                <NavLink className="header__nav-link" to='history'>
                  <span className="material-symbols-outlined">history</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink className="header__nav-link" to='login'>
                <span className="material-symbols-outlined">account_circle</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        {currentUser && (
          <>
            <NavLink className="main__button" to="/new">New QuikVote</NavLink>
            <NavLink className="main__button" to="/join">Join QuikVote</NavLink>
          </>
        )}
        {!currentUser &&
          <p className="home__p">
            <NavLink className="home__link" to="/login">Login/Register</NavLink> to create or join a QuikVote
          </p>
        }
        {randomCard.length > 0 &&
          <p className="home__p">Here's your lucky card: {randomCard}</p>
        }
      </main>
    </>
  )
}
