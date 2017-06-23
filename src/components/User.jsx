import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Individual from './Individual';

class User extends React.Component {
    constructor() {
        super();
        this.state = {};
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
          // console.log( 'User data', response );
        },
        })
        .then((user) => {
                this.setState({
                    user: user
                });
        })
    }

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
        if (!this.state.user) {
            return (<div className="user-page">LOADING...</div>);
        }

        const user = this.state.user;

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

        return (
            <div className="user-page">
                <div className="user-info">
                    <Link className="user-info__text">
                      <img className="user-info__avatar" src={user.data.profile_picture} alt={`${user.data.username}`}/>
                    </Link>
                      <div className="user-info__title">
                        <div className="title">
                          <h7 classID="h2text">{user.data.username}</h7>
                        </div>
                        <div className="stats">
                          <ul className="user-info__stats">
                            {stats.map(this.renderStat)}
                          </ul>
                        </div>
                        <div className="bio">
                          <p><b>{user.data.full_name}</b></p>
                          <p>{user.data.bio}</p>
                        </div>
                      </div>

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
