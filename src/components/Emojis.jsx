import React, { PropTypes } from 'react'

const accessTOK =  this.props.location.hash.substr(1)
console.log('location', this.props.location)
$.ajax({
  url: `https://vision.googleapis.com/v1/images:annotate?key=?${accessTOK}`,
  jsonp: "callback",
  dataType: "jsonp",

  success: function( response ) {

  },
})

class Emojis extends React.Component {
  render () {
    return(

    )
  }
}

export default Emojis;
