/*
What is this sorcery?? Importing a CSS file in JavaScript?
Make sure you understand what's going on here!!!
*/
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Search from './components/Search';
import User from './components/User';
import Individual from './components/Individual';

/*
Rendering a router will output the right component tree based on the current URL.
Nested routes' components will be passed down to the parent as `this.props.children`

If the URL is /, then <App/> will be rendered, and this.props.children will be <Search/> (this is the IndexRoute)
If the URL is /user/ziad-saab then <App/> will be rendered, and this.props.children will be <User/>
The <User/> instance will be passed a prop called `params`. It will be an object with `{username: 'ziad-saab'}`
*/

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Search}/>
            <Route path="/:username" component={User}>
              <Route path="/individual" component={Individual} />
            </Route>
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
