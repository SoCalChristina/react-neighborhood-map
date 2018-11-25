import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

//declare map api as a constant
const Map_Key = 'AIzaSyBVMw1jhal8PJLsikGso7YOp-qqDHATDC4'; //use with GoogleApiWrapper component

class MapDisplay extends Component {
  state = {
    map: null
  };

  componentDidMount = () => {
  }

  mapReady = (props, map) => { //pass the props and map once map is loaded
  this. setState({map});
}

render = () => {
  const style = {
    width: '100%',
    height: '100%'
  }

  const center = { // using the google maps format
    lat: this.props.lat,
    lng: this.props.lon
  }

  return (
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
    )
  }
}

export default GoogleApiWrapper({apiKey: Map_Key})(MapDisplay)
