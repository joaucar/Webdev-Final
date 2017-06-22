import React, { PropTypes } from 'react';
import { Marker, InfoWindow } from "react-google-maps";
import {Icon} from 'react-fa';

class Location extends React.Component {
  state = {
    isInfoWindowOpen: false
  }

  handleClick = () => {
    this.setState({isInfoWindowOpen: !this.state.isInfoWindowOpen })
  }

  render () {
    const {props} = this
    return (
      <div>
        <Marker
          onClick={this.handleClick}
          position={{
            lat: props.marker.location.latitude,
            lng: props.marker.location.longitude
        }}/>
      {this.state.isInfoWindowOpen ?
        <InfoWindow defaultPosition={{
            lat: props.marker.location.latitude,
            lng: props.marker.location.longitude
          }}>
          <div className="thumbnail">
            <h4> <Icon name="map-marker" />     {props.marker.location.name}</h4>
            <img className="markerimage" src={props.marker.images.thumbnail.url} />
            <p>{props.marker.caption.text}</p>
          </div>
        </InfoWindow>
      : null}
      </div>
    )
  }
}

export default Location;
