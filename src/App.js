import React, { Component } from 'react';
//add an image to react. Source: https://stackoverflow.com/questions/37644265/correct-path-for-img-on-react-js
import logo from './images/taco-truck.png';
import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const Map_Key = 'AIzaSyBVMw1jhal8PJLsikGso7YOp-qqDHATDC4'; //use with GoogleApiWrapper component

class MapDisplay extends Component {
  state = {
    map: null
  };

  componentDidMount = () => {
  }

  mapReady = {props, map) => } //pass the props and map once map is loaded
  this. setState({map});
}

render = () => {
  const style = {
    width: '100%',
    height: '100%';
  }
  const center = { // using the google maps format
    lat: this.props.lat,
    lng: this.props.lon
  }
  return {
    <Map
      role="application"
      aria-label="map" //add accesibility features
      onReady={this.mapReady}
      google={this.props.google}//taken from higher order component, GoogleApiWrapper
      zoom={this.props.zoom}
      style={style}
      initial Center={center}
      onClick={this.closeInfoWindow}>
      </Map>
  }
}

import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo">
            <img src={logo} className="logo" alt={"taco truck logo"} />
          </div>
        //  <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
