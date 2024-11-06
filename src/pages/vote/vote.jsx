import React, { useState } from 'react';
import './vote.css';
import { NavLink } from 'react-router-dom';

/*
  <title>QuikVote</title>
  */

const MIN_VALUE = 0
const MAX_VALUE = 10

function VoteOption(props) {
  const [value, setValue] = useState(5)
  function increaseValue() {
    if (value == MAX_VALUE) {
      return
    }
    setValue(value + 1)
  }
  function decreaseValue() {
    if (value == MIN_VALUE) {
      return
    }
    setValue(value - 1)
  }
  return (
    <li className="vote-options__item">{props.name}
      <div className="vote-buttons">
        <button className="vote-buttons__button" onClick={decreaseValue}>
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
        <span className="vote-buttons__value">{value}</span>
        <button className="vote-buttons__button" onClick={increaseValue}>
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      </div>
    </li>
  )
}

function AddOption(props) {
  const [value, setValue] = useState('')
  function submit() {
    props.onSubmit(value)
    setValue('')
  }
  function onKeyDown(event) {
    if (event.key == "Enter" && !checkDisabled()) {
      submit()
    }
  }
  function addButtonClicked(event) {
    event.preventDefault()
    submit()
  }
  function checkDisabled() {
    return value == ''
  }
  return (
    <form className="add-option">
      <input
        className="add-option__input"
        type="text"
        onKeyDown={onKeyDown}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Add to list" />
      <button
        className={`add-option__button ${checkDisabled() ? 'add-option__button--disabled' : ''}`}
        type="submit"
        onClick={addButtonClicked}
        disabled={checkDisabled()}>
        <span className="material-symbols-outlined">add</span>
      </button>
    </form>
  )
}

export default function Vote(props) {
  const [options, setOptions] = useState([])
  const [lockedIn, setLockedIn] = useState(false)
  const [copied, setCopied] = useState(false)
  const roomCode = 'BD82' // TODO: get from server
  function addOption(opt) {
    setOptions([...options, opt])
  }
  function renderOptions() {
    if (options.length == 0) {
      return (<p>Add an option...</p>)
    }
    return options.map((opt, i) => (
      <VoteOption name={opt} key={i} />
    ))
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(roomCode)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 500);
  }
  function renderButton() {
    const lockInButton = (<button className="main__button" onClick={() => setLockedIn(true)}>Lock in vote</button>)
    const lockedInButton = (<button className="main__button main__button--disabled" disabled>Locked in</button>)
    const closeVoteButton = (<button className="main__button">Close vote</button>)
    const viewResultsButton = (<NavLink className="main__button" to="/results">View Results</NavLink>)

    if (!lockedIn) {
      return lockInButton
    }
    if (/*!props.resultsReady*/ false) { // TODO: wait until everyone has locked in their votes. determine from server request
      // if (context.isRoomOwner) { return closeVoteButton } // TODO: only room owner can force close vote. determine from server request
      return lockedInButton
    }
    return viewResultsButton
  }
  return (
    <>
      <header className="header header--room-code" onClick={copyToClipboard}>
        <h3>{roomCode}</h3>
        <span className="material-symbols-outlined">content_copy</span>
        <span className={`header-room-code__toast ${copied ? 'header-room-code__toast--visible' : ''}`}>Copied</span>
      </header>
      <main className="main">
        <ul className="vote-options">
          {renderOptions()}
        </ul>
        <AddOption onSubmit={addOption} />
        {renderButton()}
      </main>
    </>
  )
}
