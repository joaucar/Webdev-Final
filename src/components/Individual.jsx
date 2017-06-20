import React from 'react';
import $ from 'jquery';
import {Icon} from 'react-fa';

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
        const accessTOK =  this.props.location.hash.substr(1)
        $.ajax({
          url: `https://api.instagram.com/v1/users/self/media/recent/?${accessTOK}`,

          jsonp: "callback",
          dataType: "jsonp",

          success: function( response ) {
          console.log( 'Individual data', response );
        },
        })



        // fetch(`https://api.instagram.com/v1/users/self/?${accessTOK}`, {
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   }
        // })
        // .then(response => response.json())
        .then((data) => {
        //         // How can we use `this` inside a callback without binding it??
        //         // Make sure you understand this fundamental difference with arrow functions!!!
                this.setState({
                    individual: data.data
                });


                        console.log('data', this.state.individual)
        })

        $.ajax({
          url: `https://gateway.watsonplatform.net/natural-language-understanding/api`,
          username: `9fd84426-c14f-435b-a403-84643418d83a`,
          password: `0sohDxAOZWyK`,
          jsonp: "callback",
          dataType: "jsonp",

          success: function( data ) {
          console.log( 'sentiment data', data );
        },
        })

        // .catch((e) => console.log(e))
    }



  render () {
    if (!this.state.individual) {
      return <div>LOADING...</div>
    }
    return (
      <div className="Individual">
        {this.state.individual.map((individual) => {
          return (
            <div className="pics">
              <div className="locations">{individual.location === null
                ? <p>  </p>
                : <p><Icon name="map-marker" />       {individual.location.name}</p>}
              </div>
              <img role="presentation" className="instagramimages" src={individual.images.standard_resolution.url} />
              <div className="caption">
                {individual.caption === null
                  ? <p>  </p>
                  : <p>{individual.caption.text}</p>}
              </div>
            </div>
          )
        })}
      </div>
    )

  }
}

export default Individual;
