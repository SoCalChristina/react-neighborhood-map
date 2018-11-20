//build container Component
import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
export class Container extends React.Component {
  render() {
    const containerStyle = {
      width: '100vw',
      height: '100vh'
    }

    return (
      <div>
      <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyBVMw1jhal8PJLsikGso7YOp-qqDHATDC4'
})(Container);
