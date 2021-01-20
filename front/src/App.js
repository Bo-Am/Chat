import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import Chat from './views/Chat/Chat';
import requireAuth from './utils/Authenticate/Authenticate';
import Logo from './components/shared/Logo/Logo'

function App() {
  return (
    <div className="App">
      <Logo/>
      <Switch>
        <Route exact path="/join" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {/* После регистрации или прохождении проверки после логина:*/}
        <Route exact path="/" component={requireAuth(Chat)} />
      </Switch>
    </div>);
}

export default App;
