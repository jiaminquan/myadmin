import React from 'react';
import Login from './views/Login/index';
import './style/normalize.scss';
import { Switch, Route, HashRouter } from 'react-router-dom';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact component={Login} path="/" />
          </Switch>
        </HashRouter>
      </div>

    );
  }
}


export default App;
