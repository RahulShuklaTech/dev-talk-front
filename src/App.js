import { Route, Switch} from 'react-router-dom';
const { Login } = require("./components/Login");
const { Signup } = require("./components/Signup");


function App() {
  return (

    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>

  );
}

export default App;
