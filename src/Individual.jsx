import React, { PropTypes } from 'react'

class Individual extends React.Component {
  constructor (props){
    super(props)
    this.state = {}

  }

  render () {
    if (!this.state.Individual) {
      return <div>LOADING...</div>
    }
    return (
      <div className="Individual">
        <div className="content">
          <div className="userphoto">
            <img src={response.data.profile_picture} />
          </div>
          <div className="underinfo">
            <h1>{}</h1>
          </div>
          <div className="photos">
          </div>
        </div>
        <div className="analysis">

        </div>
      </div>
    )

  }
}

export default Individual;
