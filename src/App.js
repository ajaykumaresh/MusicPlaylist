import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Redirect, NavLink } from 'react-router-dom';
import Allsongs from './components/allsongs';
import Playlist from './components/playlist';
//import Playlist from './components/playlist';  


function App(props) {

  return (
    <div className="container-sm">
      <div className="App">
        <BrowserRouter>
          <div className="d-flex flex-column flex-sm-row justify-content-center mb-3">
            <div className="Nav-bar mb-3" >
              <NavLink activeClassName="my-active" exact to="/allsongs">All Songs</NavLink>
            </div>
            <div className="Nav-bar" >
              <NavLink activeClassName="my-active" to="/playlist">Playlists</NavLink>
            </div>
          </div>
          <Redirect from="/" to="allsongs" />
          <Route exact path="/playlist" children={<Playlist />} />
          <Route exact path="/allsongs" children={<Allsongs />} />
        </BrowserRouter>
      </div>
    </div >
  );
}

export default App;
