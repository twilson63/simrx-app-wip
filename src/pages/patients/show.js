import React, { Component } from 'react'
import moment from 'moment'
import fetch from 'isomorphic-fetch'
import { toPairs, compose, map } from 'ramda'
import { Link } from 'react-router-dom'

import Counter from '../counter'

const url = 'http://localhost:9000'

class Patient extends Component {
  constructor() {
    super()
    this.state = {
      patient: {
        name: {
          last: '',
          first: ''
        }
      }
    }
  }
  componentDidMount () {
    fetch(`${url}/patients/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(patient => this.setState({patient}))
  }
  render () {
    const { patient } = this.state
    const liAddress = ([label, value]) => <li key={label}>{value}</li>
    return (
      <div className="tc">
        <img alt="avatar" src={patient.avatar} />
        <h1>{patient.name.first} {patient.name.last}</h1>
        <div>Age: {moment(moment()).diff(patient.birthDate,'years')}</div>
        <div>
          <ul className="tl list">
            { compose(
                map(liAddress),
                toPairs
              )(patient.address)
            }
          </ul>
        </div>
        <Link to="/">Return</Link>
        <Counter />
      </div>
    )
  }
}

export default Patient
