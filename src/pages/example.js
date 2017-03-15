import React from 'react'

class Example from React.Component {
  render() {
    return (
      <div>Component</div>
    )
  }
}

Example.propTypes = {
  save: React.PropTypes.func.isRequired
}

export default Example
