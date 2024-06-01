import React from 'react'
import { ACTIONS } from './App'

function OperationBtn({dispatch, operation}) {
  return (
    <button className="btn-actions"
    onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}
    >{operation}</button>
  )
}

export default OperationBtn