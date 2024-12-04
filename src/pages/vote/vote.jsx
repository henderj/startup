import React, { useEffect, useState } from 'react';
import './vote.css';
import { NavLink, useParams } from 'react-router-dom';
import { WSHandler } from './websocket_handler'

const MIN_VALUE = 0
const MAX_VALUE = 10

function VoteOption(props) {
  function increaseValue() {
    if (props.value == MAX_VALUE) {
      return
    }
    props.setValue(props.value + 1)
  }
  function decreaseValue() {
    if (props.value == MIN_VALUE) {
      return
    }
    props.setValue(props.value - 1)
  }
  return (
    <li className="vote-options__item">{props.name}
      <div className="vote-buttons">
        <button
          className={`vote-buttons__button ${props.disabled ? 'vote-buttons__button--disabled' : ''}`}
          onClick={decreaseValue}
          disabled={props.disabled}
        >
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
        <span className="vote-buttons__value">{props.value}</span>
        <button
          className={`vote-buttons__button ${props.disabled ? 'vote-buttons__button--disabled' : ''}`}
          onClick={increaseValue}
          disabled={props.disabled}
        >
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
    return props.disabled || value == ''
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

export default function Vote() {
  useEffect(() => {
    document.title = 'QuikVote'
  }, [])
  const [options, setOptions] = useState([])
  const [values, setValues] = useState(new Map())
  const [lockedIn, setLockedIn] = useState(false)
  const [isRoomOwner, setIsRoomOwner] = useState(false)
  const [resultsId, setResultsId] = useState('')
  const [copied, setCopied] = useState(false)
  const [code, setCode] = useState('')

  const { id } = useParams()

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(`/api/room/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      if (response.status == 200) {
        const body = await response.json()
        setCode(body.code)
        body.options.forEach(opt => {
          if (!values.has(opt)) {
            values.set(opt, 5)
          }
        })
        setValues(new Map(values))
        setOptions(body.options)
      }
    }
    fetchRoom().catch(console.error)
  }, [])

  useEffect(() => {
    WSHandler.addHandler(receiveOptions)

    return () => WSHandler.removeHandler(receiveOptions)
  })

  function receiveOptions(new_options) {
    console.log(`received options: ${new_options}`)
    new_options.forEach(opt => {
      if (!values.has(opt)) {
        values.set(opt, 5)
      }
    })
    setValues(new Map(values))
    setOptions(new_options)
  }

  async function addOption(opt) {
    WSHandler.addOption(id, opt)
  }
  function renderOptions() {
    if (options.length == 0) {
      return (<p>Add an option...</p>)
    }
    return options.map((opt, i) => (
      <VoteOption
        name={opt}
        key={i}
        value={values.get(opt)}
        setValue={(val) => setValues(new Map(values.set(opt, val)))}
        disabled={lockedIn}
      />
    ))
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 500);
  }
  function renderButton() {
    const lockInButton = (<button
      className="main__button"
      onClick={() => {
        setLockedIn(true)
        fetch(`/api/room/${id}/lockin`, {
          method: 'POST',
          body: JSON.stringify({ votes: Object.fromEntries(values) }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
          .then(res => res.json())
          .then(j => {
            setIsRoomOwner(j.isOwner)
            setResultsId(j.resultsId)
          })
      }}
    >Lock in vote</button>)
    const lockedInButton = (<button className="main__button main__button--disabled" disabled>Locked in</button>)
    const closeVoteButton = (<button
      className="main__button"
      onClick={() => fetch(`/api/room/${id}/close`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(res => res.json())
        .then(j => setResultsId(j.resultsId))
      }
    >Close vote</button>)
    const viewResultsButton = (<NavLink
      className="main__button"
      to={`/results/${resultsId}`}
    >View Results</NavLink>)

    if (!lockedIn) {
      return lockInButton
    }
    if (resultsId === '') {
      if (isRoomOwner) { return closeVoteButton }
      return lockedInButton
    }
    return viewResultsButton
  }
  return (
    <>
      <header className="header header--room-code" onClick={copyToClipboard}>
        <h3>{code}</h3>
        <span className="material-symbols-outlined">content_copy</span>
        <span className={`header-room-code__toast ${copied ? 'header-room-code__toast--visible' : ''}`}>Copied</span>
      </header>
      <main className="main">
        <ul className="vote-options">
          {renderOptions()}
        </ul>
        <AddOption onSubmit={addOption} disabled={lockedIn} />
        {renderButton()}
      </main>
    </>
  )
}
