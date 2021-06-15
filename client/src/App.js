import Dashboard from './layouts/dashboard';
import { Route, Switch } from 'react-router-dom';

//Pages
import Home from './pages/home';
import Songs from './pages/songs';

function App() {
  return (
    <div className="App">
      <Dashboard>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/songs" component={Songs} />
      </Switch>
      </Dashboard>
    </div>
  );
}

export default App;
