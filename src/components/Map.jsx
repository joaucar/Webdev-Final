import React from 'react'
import { withGoogleMap, GoogleMap } from "react-google-maps"
import Location from './Location';


const IndividualGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={2}
    minZoomLevel={2}
    defaultCenter={{ lat: 0, lng: -50 }} >

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

  render () {
    return(
      <div className="map">
      <IndividualGoogleMap
        markers={this.props.markers}
        containerElement={
          <div style={{ height: `500px`, width: '1000px', maxZoomLevel: 10}} />
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
