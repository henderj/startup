import React from 'react';
import './app.css';

export default function App() {
  return (
    <>
      <header>
        <h1>QuikVote</h1>
        <nav>
          <ul>
            <li>
              <a href="./pages/history.html">
                <span class="material-symbols-outlined">history</span>
              </a>
            </li>
            <li>
              <a href="./pages/login.html">
                <span class="material-symbols-outlined">account_circle</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        App component goes here
      </main>
      <footer>
        <span class="text-reset">Josh Hendershot</span>
        <a href="https://github.com/henderj/startup">Github</a>
      </footer>
    </>
  )
}
