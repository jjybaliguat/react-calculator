import React from 'react'
import { ACTIONS } from './App'

function OperationBtn({dispatch, operation, disabled}) {
  return (
    <button className="btn-actions"
    disabled={disabled}
    onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}
    >{operation}</button>
  )
}

export default OperationBtn