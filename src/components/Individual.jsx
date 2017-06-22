import React from 'react';
import $ from 'jquery';
import {Icon} from 'react-fa';
import Map from './Map'
import Emojis from './Emojis'
//import Sticky from 'react-sticky-el';

const ALCHEMY_API_KEY = "1Ccn8-u7IJ1XoEdIioWyh63a5BSuCik9vDa6s-MesYjb"

class Individual extends React.Component {
  constructor() {
    super();
    this.state = {
      individual: []
    };
  }

  /*
    This method will be called by React after the first render. It's a perfect place to load
    data with AJAX. This User component gets mounted in the DOM as soon as the URL is /user/:username

    When that happens, react-router will pass a `params` prop containing every parameter in the URL, just like
    when we get URL parameters in Express with req.params. Here, it's this.props.params. Since we called our route
    parameter `username`, it's available under this.props.params.username

    We're using it to make an API call to GitHub to fetch the user data for the username in the URL. Once we receive
    the data -- in the callback -- we call `setState` to put the user data in our state. This will trigger a re-render.
    When `render` gets called again, `this.state.user` exists and we get the user info display instead of "LOADING..."
    */

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
         "requests":[
           {
             "image":{
              "source": {
                "imageUri": image.images.standard_resolution.url
              }
              },
             "features":[
               {
                 "type":"FACE_DETECTION"
               },
               {
                 "type": "SAFE_SEARCH_DETECTION"
               }
             ]
           }
         ]
       };
      fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBUOfIfVpDCIIYz9n7cCbMpHPD3msBZ_ig', {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        })
        .then((raw) => raw.json())
        .then((res) => {
          console.log('res', res)
          this.setState({
            individual: this.state.individual.concat([{
              ...image,
              visionData: res
            }])
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
        <Map {...this.props}/>
      </div>
    )

  }
}

export default Individual;
