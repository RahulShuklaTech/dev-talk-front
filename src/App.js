import { Container } from '@chakra-ui/react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Feed } from './components/Feed';
import { Profile } from './components/Profile';
import setupInterceptors from './interceptors';
const { Login } = require("./components/Login");
const { Signup } = require("./components/Signup");




function App() {
  const history = useHistory();
  setupInterceptors(history);
  return (
    
    <Container centerContent minWidth="100%" minHeight="100vh" >
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/profile/" component={Profile} />
        <Route exact path="/profile/:username" component={Profile} />
      </Switch>
    </Container>

  );
}

export default App;
