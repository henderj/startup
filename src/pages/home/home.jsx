import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function Home() {
  useEffect(() => {
    document.title = 'QuikVote'
  }, [])
  const { currentUser } = useContext(UserContext)
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
      </main>
    </>
  )
}
