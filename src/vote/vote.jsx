import React from 'react';
import './vote.css';

/*
  <title>QuikVote</title>
  ...
    <h3>YBD-027</h3>
    <span class="material-symbols-outlined">content_copy</span>
  */

export default function Vote() {
  return (
    <>
      <ul>
        <li>Pizza
          <div class="vote-buttons">
            <button>
              <span class="material-symbols-outlined">arrow_upward</span>
            </button>
            <span class="vote-value">2</span>
            <button>
              <span class="material-symbols-outlined">arrow_downward</span>
            </button>
          </div>
        </li>
        <li>Burgers
          <div class="vote-buttons">
            <button>
              <span class="material-symbols-outlined">arrow_upward</span>
            </button>
            <span class="vote-value">8</span>
            <button>
              <span class="material-symbols-outlined">arrow_downward</span>
            </button>
          </div>
        </li>
        <li>Seafood
          <div class="vote-buttons">
            <button>
              <span class="material-symbols-outlined">arrow_upward</span>
            </button>
            <span class="vote-value">5</span>
            <button>
              <span class="material-symbols-outlined">arrow_downward</span>
            </button>
          </div>
        </li>
      </ul>
      <form>
        <input type="text" placeholder="Add to list" />
        <button type="submit">
          <span class="material-symbols-outlined">add</span>
        </button>
      </form>
      <button class="button">Lock in vote</button>
      <button class="button">Close vote</button>
      <a class="button" href="results.html">View Results</a>
    </>
  )
}
