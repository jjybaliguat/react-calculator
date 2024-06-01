import React, { useReducer } from "react";
import "./styles.css"
import DigitBtn from "./DigitBtn";
import OperationBtn from "./OperationBtn";
import { formatOperand } from "./IntegerFormatter";

const ERRRORS = {
  UNDEFINED: 'Undefined',
  CANNOT_DIVIDE: "Can't divide by zero"
}

const initialState = {
  currentOperand: "0",
  prevOperand: "",
  operation: "",
  statement: ""
}

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  REMOVE_DIGIT: "remove-digit",
  REMOVE_CURRENT: "remove-current",
  CLEAR: 'clear',
  CHOOSE_OPERATION: "choose-operation",
  CALCULATE: 'calculate'
}

function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0"){
        return state
      }
      if(state.currentOperand.includes(".") && payload.digit === "."){
        return state
      }
      if(state.currentOperand === "0" && payload.digit === "."){
        return {
          ...state,
          currentOperand: `${state.currentOperand}${payload.digit}`
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand === "0" ? "" : state.currentOperand}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.overwrite){
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currentOperand,
          statement: `${formatOperand(state.currentOperand)} ${payload.operation}`,
        }
      }
      if(state.prevOperand === ""){
        return {
          ...state,
          operation: payload.operation,
          prevOperand: `${state.currentOperand}`,
          statement: `${formatOperand(state.currentOperand)} ${payload.operation}`,
          currentOperand: "0",
        }
      }
      return {
        ...state,
        overwrite: true,
        prevOperand: calculate(state),
        currentOperand: calculate(state),
        operation: payload.operation,
        statement: `${formatOperand(calculate(state))} ${payload.operation}`,
      }
    case ACTIONS.CALCULATE:
      if(state.currentOperand === ERRRORS.CANNOT_DIVIDE || state.currentOperand === ERRRORS.UNDEFINED){
        return initialState
      }
      if(state.operation === ""){
        return state
      }
      if(state.overwrite){
        return {
          ...state,
          overwrite: true,
          currentOperand: calculate(state),
          prevOperand: state.persistedOperand,
          statement: `${formatOperand(state.currentOperand)} ${state.operation} ${state.persistedOperand}`,
        }
      }
      return {
        ...state,
        overwrite: true,
        persistedOperand: state.currentOperand,
        statement: `${formatOperand(state.prevOperand)} ${state.operation} ${formatOperand(state.currentOperand)} =`,
        currentOperand: calculate(state),
      }
    case ACTIONS.REMOVE_DIGIT:
      if(state.currentOperand === ERRRORS.CANNOT_DIVIDE || state.currentOperand === ERRRORS.UNDEFINED){
        return initialState
      }
      if(state.overwrite){
        return {
          ...state,
          statement: "",
          operation: "",
          prevOperand: ""
        }
      }
      if(state.currentOperand === "0" || state.currentOperand.length === 1){
        return {
          ...state,
          currentOperand: "0",
        }
      }
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.REMOVE_CURRENT:
      if(state.currentOperand === ERRRORS.CANNOT_DIVIDE || state.currentOperand === ERRRORS.UNDEFINED){
        return initialState
      }
      return {
        ...state,
        currentOperand: "0"
      }
    case ACTIONS.CLEAR:
      return initialState
    default: 
      return state
  }
}

function calculate({operation, currentOperand, prevOperand}){
  const prev = parseFloat(prevOperand)
  const current = parseFloat(currentOperand)

  if(isNaN(prev) || isNaN(current)){
    return ""
  }

  let answer = ""

  switch(operation){
    case "+":
      answer = prev + current
      break
    case "−":
      answer = prev - current
      break
    case "×":
      answer = prev * current
      break
    case "÷":
      answer = prev / current
      break
  }

  if(isNaN(answer)){
    return ERRRORS.UNDEFINED
  }

  if(answer.toString() === "Infinity"){
    return ERRRORS.CANNOT_DIVIDE
  }

  return answer.toString()
}

function App() {
  const [{statement, currentOperand}, dispatch] = useReducer(reducer, initialState)
  const disabledOperation = currentOperand === ERRRORS.CANNOT_DIVIDE || currentOperand === ERRRORS.UNDEFINED

  return (
    <div className="grid-container">
      <div className="output">
        <div className="output-prev">{statement}</div>
        <div className="output-current">{formatOperand(currentOperand)}</div>
      </div>
      <button onClick={() => dispatch({type: ACTIONS.REMOVE_CURRENT})} className="btn-actions">CE</button>
      <button onClick={() => dispatch({type: ACTIONS.CLEAR})} className="btn-actions">AC</button>
      <button onClick={() => dispatch({type: ACTIONS.REMOVE_DIGIT})} className="btn-actions">DEL</button>
      <OperationBtn operation={"÷"} dispatch={dispatch} disabled={disabledOperation} />
      <DigitBtn digit={"1"} dispatch={dispatch} />
      <DigitBtn digit={"2"} dispatch={dispatch} />
      <DigitBtn digit={"3"} dispatch={dispatch} />
      <OperationBtn operation={"×"} dispatch={dispatch} disabled={disabledOperation} />
      <DigitBtn digit={"4"} dispatch={dispatch} />
      <DigitBtn digit={"5"} dispatch={dispatch} />
      <DigitBtn digit={"6"} dispatch={dispatch} />
      <OperationBtn operation={"+"} dispatch={dispatch} disabled={disabledOperation} />
      <DigitBtn digit={"7"} dispatch={dispatch} />
      <DigitBtn digit={"8"} dispatch={dispatch} />
      <DigitBtn digit={"9"} dispatch={dispatch} />
      <OperationBtn operation={"−"} dispatch={dispatch} disabled={disabledOperation} />
      <DigitBtn digit={"."} dispatch={dispatch} />
      <DigitBtn digit={"0"} dispatch={dispatch} />
      <button onClick={() => dispatch({type: ACTIONS.CALCULATE})} className="btn-actions span-2">=</button>
    </div>
  );
}

export default App;
