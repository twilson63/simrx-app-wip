import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { merge } from 'ramda'
import reduxThunk from 'redux-thunk'

const url = 'http://localhost:9000'

import { map, compose, nth, split, prop, set, lensProp,
head, reverse, reject, equals } from 'ramda'

const parseId = compose(
  nth(1),
  split('/'),
  prop('_id')
)


const INCREMENT = 'INCREMENT'
const LIST = 'LIST'

const reducer = (state = {
  counter: 0,
  patients: []
}, action) => {
  switch (action.type) {
    case LIST:
      return {...state, patients: action.payload }
    case INCREMENT:
       return {...state, counter: state.counter + 1 }
    default:
      return state
  }
  return state
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    patients: state.patients
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncreaseClick: () => dispatch({ type: INCREMENT }),
    onList: () => {
      return fetch(`${url}/patients`)
        .then(res => res.json())
        .then(map(p => set(lensProp('_id'), parseId(p), p)))
        .then(patients => dispatch({ type: LIST, payload: patients }))
    }
  }
}

const store = createStore(reducer, applyMiddleware(reduxThunk))
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)
export { store, connector }
