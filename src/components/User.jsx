import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Individual from './Individual';
// import Sticky from 'react-sticky-el';

class User extends React.Component {
    constructor() {
        super();
        this.state = {};
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
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.params.username !== this.props.params.username){
        //this.fetchData()
        console.log('infinite loop')
      }
    }
    componentDidMount() {
      this.fetchData()

      
    }

    fetchData() {
        const accessTOK =  this.props.location.hash.substr(1)
        $.ajax({
          url: `https://api.instagram.com/v1/users/self/?${accessTOK}`,

          jsonp: "callback",
          dataType: "jsonp",

          success: function( response ) {
          console.log( 'User data', response );
        },
        })
        // fetch(`https://api.instagram.com/v1/users/self/?${accessTOK}`, {
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   }
        // })
        // .then(response => response.json())
        .then((user) => {
        //         // How can we use `this` inside a callback without binding it??
        //         // Make sure you understand this fundamental difference with arrow functions!!!
                this.setState({
                    user: user
                });
        })
        // .catch((e) => console.log(e))
    }

    /*
    This method is used as a mapping function. Eventually this could be factored out to its own component.
    */
    renderStat(stat) {
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    }

    render() {
        // If the state doesn't have a user key, it means the AJAX didn't complete yet. Simply render a LOADING indicator.
        if (!this.state.user) {
            return (<div className="user-page">LOADING...</div>);
        }

        // If we get to this part of `render`, then the user is loaded
        const user = this.state.user;

        // Gather up some number stats about the user, to be used in a map below
        var stats = [
            {
                name: 'Posts',
                value: user.data.counts.media,
            },
            {
                name: 'Followers',
                value: user.data.counts.followed_by,
            },
            {
                name: 'Following',
                value: user.data.counts.follows,
            }
          ]
        // Look in index.css for the styles that make this look like it does
        return (
            <div className="user-page">
                <div className="user-info">
                    <Link className="user-info__text">
                        <img className="user-info__avatar" src={user.data.profile_picture} alt={`${user.data.username}`}/>
                        <h2 className="user-info__title">{user.data.username} <br />{user.data.full_name}</h2>
                    </Link>

                    <ul className="user-info__stats">
                        {stats.map(this.renderStat)}
                    </ul>
                </div>
                <div>
                  <Individual location={this.props.location} />
                </div>
                {this.props.children}
            </div>
        );
    }
};

export default User;
