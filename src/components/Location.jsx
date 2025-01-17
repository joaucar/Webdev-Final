import React from 'react';
import { Marker, InfoWindow } from "react-google-maps";
import {Icon} from 'react-fa';


const getJoyMarker = (likelyhood) => {
     if(likelyhood === 'LIKELY' || likelyhood === 'VERY_LIKELY') {
      return 'https://emojipedia-us.s3.amazonaws.com/cache/88/6a/886a2d7496a6f28e8e2e8c39b926fe98.png'
    } else {
      return 'https://emojipedia-us.s3.amazonaws.com/cache/62/b5/62b5b98617ce2f92554ded75ef2120e2.png'
    }
}

class Location extends React.Component {
  state = {
    isInfoWindowOpen: false
  }

  handleClick = () => {
    this.setState({isInfoWindowOpen: !this.state.isInfoWindowOpen })
  }

  render () {
    const {props} = this
    var markerimg;
    if(props.marker.visionData.responses[0] && props.marker.visionData.responses[0].faceAnnotations) {
      markerimg = getJoyMarker(props.marker.visionData.responses[0].faceAnnotations[0].joyLikelihood)
    } else {
      markerimg = getJoyMarker('https://emojipedia-us.s3.amazonaws.com/cache/62/b5/62b5b98617ce2f92554ded75ef2120e2.png')
    }
    return (
      <div>
        { window.google ? <Marker className="markerimg"
          icon={{
            url: markerimg,
            scaledSize: new window.google.maps.Size(40, 40)
          }}
          onClick={this.handleClick}
          position={{
            lat: props.marker.location.latitude,
            lng: props.marker.location.longitude
        }}/> : null }
      {this.state.isInfoWindowOpen ?
        <InfoWindow defaultPosition={{
            lat: props.marker.location.latitude,
            lng: props.marker.location.longitude
          }}>
          <div className="thumbnail">
            <h8> <Icon name="map-marker" />     {props.marker.location.name}</h8>
            <img className="markerimage" role="presentation" src={props.marker.images.thumbnail.url} />
            <h8>{props.marker.caption.text}</h8>
          </div>
        </InfoWindow>
      : null}
      </div>
    )
  }
}

export default Location;
