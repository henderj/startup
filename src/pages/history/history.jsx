import React, { useContext, useEffect, useState } from 'react';
import './history.css';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs'
import { UserContext } from '../../context/userContext';

export default function History() {
  useEffect(() => {
    document.title = 'Past QuikVotes'
  }, [])
  const { currentUser } = useContext(UserContext)
  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/history', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      if (response.status == 200) {
        const body = await response.json()
        setDataArray(body.history.map(h => ({
          winner: h.sortedOptions[0],
          runnersUp: h.sortedOptions.slice(1),
          date: h.timestamp
        })))
      }
    }
    fetchData().catch(console.error)
  }, [])
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
        <h3 className="username">Username: <b>{currentUser.username}</b></h3>
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

