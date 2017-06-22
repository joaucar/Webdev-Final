import React from 'react'
import { withGoogleMap, GoogleMap } from "react-google-maps"
import $ from 'jquery';
import Location from './Location'


const IndividualGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={2}
    minZoomLevel={2}
    defaultCenter={{ lat: 0, lng: -50 }}
  >

    {props.markers.map((marker, i) => {
      return (
        <div className="markers">
          {marker.location !== null ? <Location key={i} marker={marker} /> : null }
        </div>
      )
    })}
  </GoogleMap>
  ));

class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      markers: [],
      hasLoaded: false,
    }
  }

  componentWillMount() {
        const accessTOK =  this.props.location.hash.substr(1)
        console.log('location', this.props.location)
        $.ajax({
          url: `https://api.instagram.com/v1/users/self/media/recent/?${accessTOK}`,
          jsonp: "callback",
          dataType: "jsonp",

          success: function( response ) {

          },
        })
        .then((res) => {
          this.setState({
              markers: res.data,
          });
          console.log("marker data", this.state.markers)
        })
  }
  render () {
    return(
      <div className="map">
      <IndividualGoogleMap
        markers={this.state.markers}
        containerElement={
          <div style={{ height: `500px`, width: '100%', maxZoomLevel: 10}} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }>

      </IndividualGoogleMap>
    </div>
    )
  }
}

export default Map;
