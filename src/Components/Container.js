//build container Component
//source: https://www.npmjs.com/package/google-maps-react
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
export class Container extends React.Component {
  render() {
    const containerStyle = {
      width: '100vw',
      height: '100vh'
    }

    return (
      <div>
      <Map google={this.props.google}> </Map>
      </div>
    )
  }
}
const GoogleApiComponent = GoogleApiComponent({
  apiKey: 'AIzaSyBVMw1jhal8PJLsikGso7YOp-qqDHATDC4'
})(Container);

export default GoogleApiComponent
