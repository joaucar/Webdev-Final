import React from 'react';
import { browserHistory as history } from 'react-router';

/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/
class Search extends React.Component {
    constructor(props) {
        super(props);

        // Why do we need to do this?? Make sure you understand!!!
    }
    _handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/${this.refs.userInput.value}`)
    }


    render() {
        return (
            <div className="search-page">
                <h2>Select a year</h2>
                <form onSubmit={this._handleSubmit}>
                    <select ref="userInput" className="search-page__input">
                      <option value="all-years">All</option>
                      <option value="iX2017"> 2017</option>
                      <option value="iX2016"> 2016</option>
                    </select>
                    <button className="search-page__button">Go</button>
                </form>
            </div>
        );
    }
};

export default Search;
