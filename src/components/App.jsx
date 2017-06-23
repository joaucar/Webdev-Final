import React from 'react';
import { Link } from 'react-router';


class App extends React.Component {
    render() {
        return (
            <div className="main-app">
              <header className="main-header">
                  <h1><Link to="/">Web Dev <br/>Final Project</Link></h1>
                <div className="icons">
                </div>
              </header>
              <main className="main-content">
                  {this.props.children}
              </main>
              <footer>
                <div className="bottompic">
                </div>
              </footer>
            </div>
        );
    }
};

export default App;
