import React from 'react'
import './login.css'

export function MessageDialog(props) {
  if (!props.message) return null;

  return (
    <div className="modal__overlay" onClick={props.onHide}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__body">{props.message}</div>
        <div className="modal__footer">
          <button className="modal__close-button" onClick={props.onHide}>Close</button>
        </div>
      </div>
    </div>
  );
}
