import { Route, Switch, useHistory} from 'react-router-dom';
import { Feed } from './components/Feed';
import { Profile } from './components/Profile';
import setupInterceptors from './interceptors';
const { Login } = require("./components/Login");
const { Signup } = require("./components/Signup");




function App() {
  const history = useHistory();
  setupInterceptors(history);
  return (

    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </div>

  );
}

export default App;