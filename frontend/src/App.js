import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { useHistory as history } from 'react-router-dom';

function App() {
  return (
    <Router history={history}>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <UserList />
          </Route>
          <Route path="/add">
            <UserForm />
          </Route>                                       
          <Route path="/edit/:id">
            <UserForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
