
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <NavLink className="main__button" to="new">New QuikVote</NavLink>
      <NavLink className="main__button" to="join">Join QuikVote</NavLink>
      <p className="home__p">
        <NavLink className="home__link" to="login">Login/Register</NavLink> to see your past QuikVotes
      </p>
    </>
  )
}
