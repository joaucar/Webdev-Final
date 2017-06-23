import React from 'react';
import $ from 'jquery';
import {Icon} from 'react-fa';
import Map from './Map'

const ALCHEMY_API_KEY = "1Ccn8-u7IJ1XoEdIioWyh63a5BSuCik9vDa6s-MesYjb"

class Individual extends React.Component {
  constructor() {
    super();
    this.state = {
      individual: []
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    console.log('location', this.props)
    const accessTOK = this.props.location.hash.substr(1)
    $.ajax({
      url: `https://api.instagram.com/v1/users/self/media/recent/?${accessTOK}`,
      jsonp: "callback",
      dataType: "jsonp",
      success: (response) => {
        this.mergeWithVisionData(response.data)
      }
    })
  }

  mergeWithVisionData = (images) => {
    images.forEach((image) => {
      const request = {
        "requests": [
          {
            "image": {
              "source": {"imageUri": image.images.standard_resolution.url}},
            "features": [
              {"type": "FACE_DETECTION"}
            ]}
        ]};
      fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBUOfIfVpDCIIYz9n7cCbMpHPD3msBZ_ig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      }).then((raw) => raw.json()).then((res) => {
        console.log('res', res)
        this.setState({
          individual: this.state.individual.concat([
            {
              ...image,
              visionData: res
            }
          ])
        })
      }).catch((e) => console.log('error', e))
    })
  }

  render() {
    console.log('this state', this.state)
    if (!this.state.individual) {
      return <div>LOADING...</div>
    }
    return (
      <div className="year-page">
        <div className="Individual">
          {this.state.individual.map((individual, i) => {
            return (
              <div className="pics" key={i}>
                <div className="locations">{individual.location === null
                    ? <p></p>
                    : <p><Icon name="map-marker"/> {individual.location.name}</p>}
                </div>
                <img role="presentation" className="instagramimages" src={individual.images.standard_resolution.url}/>
                <div className="caption">
                  {individual.caption === null
                    ? <p></p>
                    : <p>{individual.caption.text}</p>}
                </div>
              </div>
            )
          })}
        </div>
        <Map markers={this.state.individual} {...this.props}/>
      </div>
    )
  }
}
export default Individual;
