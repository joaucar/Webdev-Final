import React from 'react';
import {Icon} from 'react-fa';

class Search extends React.Component {

    _handleSubmit = (e) => {
        e.preventDefault();
        window.location.href="https://api.instagram.com/oauth/authorize/?client_id=f1b5b90485d54686b39018332f362cab&redirect_uri=http://localhost:3000/user&response_type=token"
    }


    render() {
        return (
            <div className="search-page">
                <h2>Find Your Photos</h2>
                <form id="button" onSubmit={this._handleSubmit}>
                    <button className="search-page__button">
                      <div id="logo"><Icon name="instagram" /></div>
                      Login
                    </button>
                </form>
            </div>
        );
    }
};

export default Search;
