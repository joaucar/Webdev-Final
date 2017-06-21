import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import $ from 'jquery';


const IndividualGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={2}
    defaultCenter={{ lat: 0, lng: 0 }}
  >
    {props.markers.map((marker, i) => {
      return (
        <div>
      {marker.location === null
        ? <Marker />
        : <Marker  key={i} position={{
            lat: marker.location.latitude,
            lng: marker.location.longitude
          }}/> }
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
      hasLoaded: false
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
      <div>
      <IndividualGoogleMap
        markers={this.state.markers}
        containerElement={
          <div style={{ height: `500px`, width: '100%' }} />
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
