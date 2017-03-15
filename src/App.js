import React, { Component } from 'react'
import Header from './header'
import 'tachyons/css/tachyons.css'

const url = 'http://localhost:9000'
import fetch from 'isomorphic-fetch'
import Patients from './pages/patients'
import Patient from './pages/patients/show'
import PatientForm from './pages/patients/form'
import { Provider } from 'react-redux'
import { store } from './store'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { map, compose, nth, split, prop, set, lensProp,
head, reverse, reject, equals } from 'ramda'

const parseId = compose(
  nth(1),
  split('/'),
  prop('_id')
)

class App extends Component {
  constructor() {
    super()
    this.state = {
      patients: [],
      prevIds: []
    }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.save = this.save.bind(this)

  }
  next (event) {
    const prevId = prop('_id', head(this.state.patients))
    const lastId = compose(
      prop('_id'),
      head,
      reverse
    )(this.state.patients)
    fetch(`${url}/patients?next=${lastId}`)
      .then(res => res.json())
      .then(map(p => set(lensProp('_id'), parseId(p), p)))
      .then(patients => this.setState({
        patients,
        prevIds: [...this.state.prevIds, prevId]
      }))

  }
  previous (event) {
    const prevId = head(reverse(this.state.prevIds)) || ''

    fetch(`${url}/patients?next=${prevId}`)
      .then(res => res.json())
      .then(map(p => set(lensProp('_id'), parseId(p), p)))
      .then(patients => this.setState({
        prevIds: reject(equals(prevId), this.state.prevIds),
        patients
      }))

  }
  save (patient) {
    return fetch(`${url}/patients`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    })
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="pa4">
            <Header title="SimRx" />
            <Route exact path="/"
              component={(props) =>
                  <Patients
                    next={this.next}
                    previous={this.previous}
                  />
              }
            />
            <Route path="/patients/new" component={
              props => <PatientForm {...props} save={this.save} /> } />
            <Route path="/patients/:id/show" component={Patient} />
          </div>
        </Router>
      </Provider>
    )
  }
}

// const App = (props) => (
//   <div>
//     <h1>Hello World 3</h1>
//   </div>
// )
// const App = React.createClass({
//   render() {
//     return (
//       <div>
//         <h1>Hello World2</h1>
//       </div>
//     )
//   }
// })

// modules.export = App
export default App
