import './App.css';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import BoatsByHName from './components/BoatsByHName.jsx';
import BoatsModify from './components/BoatsModify';
import NoMatch from './components/NoMatch.jsx';
import facade from './apiFacade';
import { Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Boats from './components/Boats.jsx';
import SignIn from './components/SignIn';
import Oners from './components/Oners';
import OwnersByBName from './components/OwnersByBName';
import AddBoat from './components/AddBoat';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('  SignIn and you will have agood detials');

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setErrorMessage('Logged out.')
  };

  return (
    <Container>
      <Router>
        <Header facade={facade} loggedIn={loggedIn} />
        <Switch>
          <Route  exact path="/">
            <Home/>
          </Route>
          <Route  path="/signin">
            <SignIn
            logout={logout}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            facade={facade}
            setErrorMessage={setErrorMessage}
            />
            </Route>
          <Route path="/oners">
            {facade.hasUserAccess('user', loggedIn) && 
              <Oners facade={facade} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>}
          </Route>
          <Route path="/boats">
            {facade.hasUserAccess('user', loggedIn) && 
              <Boats  facade={facade} setErrorMessage={setErrorMessage} errorMessage={errorMessage} />}
          </Route>
          <Route path="/boatsByHName">
            {facade.hasUserAccess('user', loggedIn) && 
              <BoatsByHName facade={facade} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Route>
          <Route path="/onwesByBName">
            {facade.hasUserAccess('user', loggedIn) && 
              <OwnersByBName facade={facade} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Route>
          <Route path="/boatsmodify">
            {facade.hasUserAccess('admin', loggedIn) && 
              <BoatsModify facade={facade} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Route>
          <Route path="/addBoat">
            {facade.hasUserAccess('admin', loggedIn) && 
              <AddBoat facade={facade} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      <Alert className="mt-4" >Status: {errorMessage}</Alert>
    </Container>
  );
}

export default App;
