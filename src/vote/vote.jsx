import React from 'react';
import './vote.css';
import { NavLink } from 'react-router-dom';

/*
  <title>QuikVote</title>
  ...
    <h3>YBD-027</h3>
    <span className="material-symbols-outlined">content_copy</span>
  */

export default function Vote() {
  return (
    <>
      <ul className="vote-options">
        <li className="vote-options__item">Pizza
          <div className="vote-buttons">
            <button className="vote-buttons__button">
              <span className="material-symbols-outlined">arrow_upward</span>
            </button>
            <span className="vote-buttons__value">2</span>
            <button className="vote-buttons__button">
              <span className="material-symbols-outlined">arrow_downward</span>
            </button>
          </div>
        </li>
        <li className="vote-options__item">Burgers
          <div className="vote-buttons">
            <button className="vote-buttons__button">
              <span className="material-symbols-outlined">arrow_upward</span>
            </button>
            <span className="vote-buttons__value">8</span>
            <button className="vote-buttons__button">
              <span className="material-symbols-outlined">arrow_downward</span>
            </button>
          </div>
        </li>
        <li className="vote-options__item">Seafood
          <div className="vote-buttons">
            <button className="vote-buttons__button">
              <span className="material-symbols-outlined">arrow_upward</span>
            </button>
            <span className="vote-buttons__value">5</span>
            <button className="vote-buttons__button">
              <span className="material-symbols-outlined">arrow_downward</span>
            </button>
          </div>
        </li>
      </ul>
      <form className="add-option">
        <input className="add-option__input" type="text" placeholder="Add to list" />
        <button className="add-option__button" type="submit">
          <span className="material-symbols-outlined">add</span>
        </button>
      </form>
      <button className="main__button">Lock in vote</button>
      <button className="main__button">Close vote</button>
      <NavLink className="main__button" to="/results">View Results</NavLink>
    </>
  )
}
