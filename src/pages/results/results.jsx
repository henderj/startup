import React from 'react';
import './results.css';
import { NavLink } from 'react-router-dom';

/*
  <title>Results</title>
  ...
  <header>
    <h1>Results</h1>
  </header>
  */

export default function Results() {
  return (
    <>
      <ol className="results-list">
        <li className="results-list__item">Pizza</li>
        <li className="results-list__item">Burgers</li>
        <li className="results-list__item">Seafood</li>
      </ol>
      <NavLink className="main__button" to="/">Home</NavLink>
    </>
  )
}
