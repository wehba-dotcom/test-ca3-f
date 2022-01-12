import { NavLink } from 'react-router-dom';

function Header({ facade, loggedIn }) {
  return (
    <div style={{marginTop:'40px'}}>
      <ul className="header">
        <li> <NavLink exact activeClassName="active" to="/"> Home </NavLink></li>
              
        {facade.hasUserAccess('user', loggedIn) && (
          <li><NavLink activeClassName="active" to="/oners">Owners</NavLink></li>
        )}
         {facade.hasUserAccess('user', loggedIn) && (
          <li><NavLink activeClassName="active" to="/boats">Boats</NavLink></li>
        )}
         {facade.hasUserAccess('user', loggedIn) && (
          <li><NavLink activeClassName="active" to="/boatsbyhname">BoatsByHarbourName</NavLink></li>
        )}
         {facade.hasUserAccess('user', loggedIn) && (
          <li><NavLink activeClassName="active" to="/ownersbtbname">OwnersByBoatName</NavLink></li>
        )}
        {facade.hasUserAccess('admin', loggedIn) && (
          <li><NavLink activeClassName="active" to="/boatsmodify"> BoatsModify</NavLink></li>
        )}
         {facade.hasUserAccess('admin', loggedIn) && (
          <li><NavLink activeClassName="active" to="/addboat"> AddBoat</NavLink></li>
        )}
         <li><NavLink  activeClassName="active" to="/signin">SignIn</NavLink></li>
      </ul>
    </div>
  );
}

export default Header;
