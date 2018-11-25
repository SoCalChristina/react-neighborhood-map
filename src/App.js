import React, {Component} from 'react';
//add an image to react. Source: https://stackoverflow.com/questions/37644265/correct-path-for-img-on-react-js
import logo from './images/taco-truck.png';
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './components/MapDisplay';

class App extends Component {
  state = {
    lat: 34.1975,
    lon: -119.1771,
    zoom: 10,
    all: locations
  }

  render = () => {
    return (
      <div className="App">
      <div className="app-header">
      <div>
        <h1>Oxnard Taco Track</h1>
      </div>
        <div className="logo">
          <img src={logo} className="app-logo" alt={"taco truck logo"} />
          </div>
    {/*  <img src={logo} className="App-logo" alt="logo" /> */}
      </div>

  <MapDisplay
      lat={this.state.lat}
      lon={this.state.lon}
      zoom={this.state.zoom}
      locations={this.state.all}/>
    <div>
    <h4>Contact me</h4>
    <h6>attributes</h6>
    </div>
    </div>
  );
}
}

export default App;
