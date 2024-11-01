import React from 'react';
import './history.css';

/*
  <title>Past QuikVotes</title>
  ...
        <li>
          <a href="../index.html">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>
        </li>
    <h1>History</h1>
  */

export default function History() {
  return (
    <>
      <h3>Username: <b>noobmaster42</b></h3>
      <ol>
        <li>
          <div>
            <h3>Winner: Star Wars</h3>
            <p>Runner up(s): Lord of the Rings, Nacho Libre, (3 more)</p>
            <p>Saturday, Sept 19, 2024 - 7:09 PM</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Winner: Secret Hitler</h3>
            <p>Runner up(s): Codenames, Exploding Kittens, (7 more)</p>
            <p>Thursday, Aug 22, 2024 - 6:13 PM</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Winner: Dogs</h3>
            <p>Runner up(s): Cats</p>
            <p>Monday, June 3, 2024 - 11:51 AM</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Winner: Dogs</h3>
            <p>Runner up(s): Cats</p>
            <p>Monday, June 3, 2024 - 11:51 AM</p>
          </div>
        </li>
      </ol>
    </>
  )
}
