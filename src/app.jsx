import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './app.css';
import Home from './pages/home/home';
import New from './pages/new/new';
import Join from './pages/join/join';
import Vote from './pages/vote/vote';
import Results from './pages/results/results';
import History from './pages/history/history';
import Login from './pages/login/login'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <header className="header">
          <h1 className="header__title">QuikVote</h1>
          <nav>
            <ul className="header__nav-list">
              <li>
                <NavLink className="header__nav-link" to='history'>
                  <span className="material-symbols-outlined">history</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="header__nav-link" to='login'>
                  <span className="material-symbols-outlined">account_circle</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main">
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/new' element={<New />} />
            <Route path='/join' element={<Join />} />
            <Route path='/vote' element={<Vote />} />
            <Route path='/results' element={<Results />} />
            <Route path='/history' element={<History />} />
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </main>
        <footer className="footer">
          <span className="text-reset">Josh Hendershot</span>
          <a className="footer__link" href="https://github.com/henderj/startup">Github</a>
        </footer>
      </BrowserRouter>
    </>
  )
}

function NotFound() {
  return <p>404: Return to sender. Address unknown.</p>;
}
