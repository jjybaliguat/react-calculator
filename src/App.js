import React, { useReducer } from "react";
import "./styles.css"
import DigitBtn from "./DigitBtn";
import OperationBtn from "./OperationBtn";

const initialState = {
  currentOperand: "0",
  prevOperand: "",
  operation: ""
}

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  REMOVE_DIGIT: "remove-digit",
  CLEAR: 'clear',
  CHOOSE_OPERATION: "choose-operation",
  CALCULATE: 'calculate'
}

function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit === "0" && state.currentOperand === "0"){
        return state
      }
      if(state.currentOperand.includes(".") && payload.digit === "."){
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand === "0" ? "" : state.prevOperand !== ""? "" : state.currentOperand}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.prevOperand === ""){
        return {
          ...state,
          operation: payload.operation,
          prevOperand: `${state.currentOperand}`,
          currentOperand: "0"
        }
      }
      return {
        ...state,
        prevOperand: calculate(state),
        currentOperand: calculate(state),
        operation: payload.operation
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

  return answer.toString()
}

function App() {
  const [{prevOperand, currentOperand, operation}, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="grid-container">
      <div className="output">
        <div className="output-prev">{prevOperand || ''} {operation || ''}</div>
        <div className="output-current">{currentOperand || ''}</div>
      </div>
      <button className="btn-actions">CE</button>
      <button onClick={() => dispatch({type: ACTIONS.CLEAR})} className="btn-actions">AC</button>
      <button className="btn-actions">DEL</button>
      <OperationBtn operation={"÷"} dispatch={dispatch} />
      <DigitBtn digit={"1"} dispatch={dispatch} />
      <DigitBtn digit={"2"} dispatch={dispatch} />
      <DigitBtn digit={"3"} dispatch={dispatch} />
      <OperationBtn operation={"×"} dispatch={dispatch} />
      <DigitBtn digit={"4"} dispatch={dispatch} />
      <DigitBtn digit={"5"} dispatch={dispatch} />
      <DigitBtn digit={"6"} dispatch={dispatch} />
      <OperationBtn operation={"+"} dispatch={dispatch} />
      <DigitBtn digit={"7"} dispatch={dispatch} />
      <DigitBtn digit={"8"} dispatch={dispatch} />
      <DigitBtn digit={"9"} dispatch={dispatch} />
      <OperationBtn operation={"−"} dispatch={dispatch} />
      <DigitBtn digit={"."} dispatch={dispatch} />
      <DigitBtn digit={"0"} dispatch={dispatch} />
      <button className="btn-actions span-2">=</button>
    </div>
  );
}

export default App;
