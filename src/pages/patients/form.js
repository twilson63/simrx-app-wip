import React, { Component } from 'react'
import Counter from '../counter'

import { set, lensPath, equals, nth, split } from 'ramda'
import { Redirect } from 'react-router-dom'

class PatientForm extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
      status: '',
      name: {
        first: '',
        last: ''
      },
      birthDate: ''
    }
    this.submit = this.submit.bind(this)
    this.change = this.change.bind(this)
  }
  submit(e) {
    e.preventDefault()
    this.props.save(this.state)
      .then(res => res.json())
      .then(res => {
        if (res.ok) {
          this.setState({status: nth(1, split('/', res.id ))})
        } else {
          this.setState({error: 'Patient did not Save'})
        }
      })
  }
  change(e) {
    this.setState(
      set(
        lensPath(e.target.name.split('.')),
        e.target.value,
        this.state
      )
    )
  }
  render() {
    return (
      <div>
        <Counter />
        <h1>New Patient</h1>
        {this.state.error && <div>{this.state.error}</div>}
        {this.state.status && <Redirect to={`/patients/${this.state.status}/show`} /> }
        <form onSubmit={this.submit}>
          <fieldset>
            <label>First Name</label>
            <input
              name="name.first"
              value={this.state.name.first}
              onChange={this.change}
            />
          </fieldset>
          <fieldset>
            <label>Last Name</label>
            <input
              name="name.last"
              value={this.state.name.last}
              onChange={this.change}
            />
          </fieldset>
          <fieldset>
            <label>Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={this.state.birthDate}
              onChange={this.change}
            />
          </fieldset>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default PatientForm
