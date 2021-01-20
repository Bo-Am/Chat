import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import Chat from './views/Chat/Chat';
import requireAuth from './utilities/Authenticate/Authenticate';
import Logo from './components/shared/Logo/Logo'

function App() {
  return (
    <div className="App">
      <Logo/>
      <Switch>
        <Route exact path="/join" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={requireAuth(Chat)} />
      </Switch>
    </div>);
}

export default App;
