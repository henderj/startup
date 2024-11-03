import React from 'react';
import './results.css';
import { NavLink } from 'react-router-dom';

/*
  <title>Results</title>
  */

export default function Results() {
  return (
    <>
      <header className="header header--center">
        <h1 className="header__title header__title--center">Results</h1>
      </header>
      <main className="main">
        <ol className="results-list">
          <li className="results-list__item">Pizza</li>
          <li className="results-list__item">Burgers</li>
          <li className="results-list__item">Seafood</li>
        </ol>
        <NavLink className="main__button" to="/">Home</NavLink>
      </main>
    </>
  )
}
