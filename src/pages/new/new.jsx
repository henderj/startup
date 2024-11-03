import React from 'react';
import './new.css';
import { NavLink } from 'react-router-dom';

/*
   <title>New QuikVote</title>
  ...
        <li>
          <a href="../index.html">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>
        </li>
  */

export default function New() {
  return (
    <>
      <div>
        <img src="../public/icon.svg" alt="icon" />
        <button className="room-code">
          <b>YBD-027</b>
          <span className="material-symbols-outlined">content_copy</span>
        </button>
        <p className="room-code__note">Share your unique QuikVote with others!</p>
      </div>
      <NavLink className="main__button" to="/vote">Begin QuikVote</NavLink>
    </>
  )
}
