import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.css';
import Home from './pages/home/home';
import New from './pages/new/new';
import Join from './pages/join/join';
import Vote from './pages/vote/vote';
import Results from './pages/results/results';
import History from './pages/history/history';
import Login from './pages/login/login'
import UserContextProvider from './context/userContext';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/new' element={<New />} />
            <Route path='/join' element={<Join />} />
            <Route path='/vote/:code' element={<Vote />} />
            <Route path='/results/:id' element={<Results />} />
            <Route path='/history' element={<History />} />
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </UserContextProvider>
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
