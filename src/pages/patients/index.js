import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connector } from '../../store'
import Counter from '../counter'
import fetch from 'isomorphic-fetch'
import { map } from 'ramda'

class Patients extends Component {
  componentDidMount () {
    this.props.onList()
  }

  render() {
    const li = patient => {
      return (
      <li key={patient._id}
        className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
          <img alt='avatar' className="w2 h2 w3-ns h3-ns br-100" src={patient.avatar} />
        <div className="pl3 flex-auto">
          <span className="f6 db black-70">
            <Link to={`/patients/${patient._id}/show`}>{patient.name.first} {patient.name.last}</Link>
          </span>
          <span className="f6 db black-70">{patient.address.city}, {patient.address.state}</span>
        </div>
        <div>
          <a href={"tel:" + patient.phone } className="f6 link blue hover-dark-gray">{patient.phone}</a>
        </div>

      </li>
      )
    }

    return (
      <div>
        <Link to="/patients/new">New Patient</Link>
        <ul className="list">
          {map(li, this.props.patients)}
        </ul>
        <div className="tc">
          <button onClick={this.props.previous}>
            Previous
          </button>
          <button onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default connector(Patients)
