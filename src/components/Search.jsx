import React from 'react';
// import { browserHistory as history } from 'react-router';
import {Icon} from 'react-fa';

/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/
class Search extends React.Component {

    _handleSubmit = (e) => {
        e.preventDefault();
        window.location.href="https://api.instagram.com/oauth/authorize/?client_id=f1b5b90485d54686b39018332f362cab&redirect_uri=http://localhost:3000/year&response_type=token"
        // history.push(`/${this.refs.userInput.value}`)
    }


    render() {
        return (
            <div className="search-page">
                <h2>Login to Instagram</h2>
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
