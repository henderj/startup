import React from 'react';
import './new.css';

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
        <button class="button room-code">
          <b>YBD-027</b>
          <span class="material-symbols-outlined">content_copy</span>
        </button>
        <p>Share your unique QuikVote with others!</p>
      </div>
      <a class="button" href="vote.html">Begin QuikVote</a>
    </>
  )
}
