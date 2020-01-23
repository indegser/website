import { createStore as cs, combineReducers } from 'redux'

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

function welcome(s = { hello: 'bye' }, action) {
  switch (action.type) {
    default:
      return s
  }
}

const reducer = combineReducers({
  counter,
  welcome,
  page: s => s || {},
})
export const createStore = state => cs(reducer, state)
