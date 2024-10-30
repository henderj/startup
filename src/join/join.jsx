import React from 'react';
import './join.css';

/*
  <title>Join QuikVote</title>
  ...
        <li>
          <a href="../index.html">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>
        </li>
    <h1>Join</h1>
  */

export default function Join() {
  return (
    <form method="get" action="vote.html">
      <label for="code">Enter your QuikVote code:</label>
      <input id="code" name="code" type="text" value="YBD-027" required />
      <img src="../public/icon.svg" alt="icon" />
      <p>Make sure this icon matches the QuikVote that you want to join:</p>
      <button class="button" type="submit">Join QuikVote</button>
    </form>
  )
}
