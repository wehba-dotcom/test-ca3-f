import './App.css';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Element3 from './components/Element3.jsx';
import AdminPage from './components/AdminPage';
import NoMatch from './components/NoMatch.jsx';
import facade from './facade';
import { Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Element2 from './components/Element2.jsx';
import SignIn from './components/SignIn';
import Element1 from './components/Element1.jsx';



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
          <Route path="/element1">
            {facade.hasUserAccess('user', loggedIn) && 
              <Element1/>}
          </Route>
          <Route path="/element2">
            {facade.hasUserAccess('user', loggedIn) && 
              <Element2/>}
          </Route>
          <Route path="/element3">
            {facade.hasUserAccess('user', loggedIn) && 
              <Element3/>}
          </Route>
          <Route path="/adminpage">
            {facade.hasUserAccess('admin', loggedIn) && 
              <AdminPage />}
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
