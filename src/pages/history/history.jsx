import React, { useContext, useEffect } from 'react';
import './history.css';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs'
import { UserContext } from '../../context/userContext';

export default function History() {
  useEffect(() => {
    document.title = 'Past QuikVotes'
  })
  const { currentUser } = useContext(UserContext)
  const dataArray = [ // TODO: load from server
    {
      winner: 'Star Wars',
      runnersUp: ['Lord of the Rings', 'Nacho Libre', 'Pirates of the Carribean', 'Legally Blond', 'The Notebook'],
      date: '2024-09-19T19:09:00'
    },
    {
      winner: 'Secret Hitler',
      runnersUp: ['Codenames', 'Exploding Kittens', 'Game 3', 'Game 4', 'Game 5', 'Game 6', 'Game 7'],
      date: '2024-08-22T18:13:00'
    },
    {
      winner: 'Dogs',
      runnersUp: ['Cats'],
      date: '2024-06-03T11:51:00'
    }
  ]
  function renderItems() {
    return dataArray.map((data, i) => (
      <HistoryItem key={i} data={data} />
    ))
  }
  return (
    <>
      <header className="header header--center-with-back">
        <nav>
          <ul className="header__nav-list">
            <li>
              <NavLink className="header__nav-link" to="/">
                <span className="material-symbols-outlined">arrow_back</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <h1 className="header__title header__title--center">History</h1>
      </header>
      <main className="main">
        <h3 className="username">Username: <b>{currentUser}</b></h3>
        <ol className="history-list">
          {renderItems()}
        </ol>
      </main>
    </>
  )
}

/*
* data = {
    winner: string
    runnersUp: string[]
    date: datetime
  }
*/
function HistoryItem(props) {
  const { winner, runnersUp, date } = props.data
  function getRunnersUp() {
    const MAX_LENGTH = 3
    if (runnersUp.length <= MAX_LENGTH) {
      return runnersUp.join(', ')
    }
    const clippedList = runnersUp.slice(0, MAX_LENGTH - 1)
    clippedList.push(`(${runnersUp.length - MAX_LENGTH + 1} more)`)
    return clippedList.join(', ')
  }
  function getFormattedDate() {
    return dayjs(date).format('dddd, MMM D, YYYY - h:mm A')
  }
  return (
    <li className="history-item">
      <h3 className="history-item__header">Winner: {winner}</h3>
      <p className="history-item__content">Runner up(s): {getRunnersUp()}</p>
      <p className="history-item__content">{getFormattedDate()}</p>
    </li>
  )
}

