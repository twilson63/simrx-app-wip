import React, {Component} from 'react'
import { connector } from '../store'

class Counter extends Component {
  render() {
    return (
      <div>
        <div>{this.props.counter}</div>
        <button onClick={e => this.props.onIncreaseClick() }>Counter</button>
      </div>
    )

  }
}

export default connector(Counter)
