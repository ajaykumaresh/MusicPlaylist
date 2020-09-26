import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Redirect,NavLink  } from 'react-router-dom';
import Allsongs from './components/allsongs';
import Playlist from './components/playlist';
//import Playlist from './components/playlist';  


function App(props) {

  return (
    <div className="App container">
        <BrowserRouter>
      <div className = "Nav-bar rounded border border-secondary" >
        <NavLink activeClassName="my-active" exact to="/allsongs">All Songs</NavLink>
        </div>
        <div className = "Nav-bar rounded border border-secondary" >
        <NavLink activeClassName="my-active"  to="/playlist">Playlists</NavLink>
        </div>
        <Redirect from="/" to="allsongs" />
        <Route exact path="/playlist" children={ <Playlist />}/>
        <Route exact path="/allsongs" children={ <Allsongs />}/>
       </BrowserRouter>
    </div>
  );
}

export default  App;
