import React, { useEffect } from 'react';
import './results.css';
import { NavLink } from 'react-router-dom';

export default function Results() {
  useEffect(() => {
    document.title = 'Results'
  })
  const items = ["Pizza", "Burgers", "Seafood"] // TODO: read from server
  function renderItems() {
    return items.map((item, i) => (
      <li className="results-list__item" key={i}>{item}</li>
    ))
  }
  return (
    <>
      <header className="header header--center">
        <h1 className="header__title header__title--center">Results</h1>
      </header>
      <main className="main">
        <ol className="results-list">
          {renderItems()}
        </ol>
        <NavLink className="main__button" to="/">Home</NavLink>
      </main>
    </>
  )
}
