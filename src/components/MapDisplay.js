import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

//declare map api as a constant
const Map_Key = 'AIzaSyBVMw1jhal8PJLsikGso7YOp-qqDHATDC4'; //use with GoogleApiWrapper component

class MapDisplay extends Component {
    state = {
        map: null,
        //list of all markerProps
        markers: [],
        //list of all properites related to markers
        markerProps: [],
        //track active marker
        activeMarker: null,
        //track props for active markers
        activeMarkerProps: null,
        //track if info window should show
        showingIngoWindow: false
    };

    componentDidMount = () => {
    }

    mapReady = (props, map) => { //pass the props and map once map is loaded
      this. setState({map});
      this.updateMarkers(this.props.locations);
    }

  closeInfoWindow = () => {
        // Disable currently active markers
    this.state.activeMarker && this
      .state
      .activeMarker
        .setAnimation(null);
        this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});
    }
    onMarkerClick = (props, marker, e) => {
        // Close open info windows
        this.closeInfoWindow();

        // Set the state to show marker info
        this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
    }

  updateMarkers = (locations) => {
      // finished after all locations filtered
      if (!locations)
          return;

        // Remove all existing markers
        this
            .state
            .markers
            .forEach(marker => marker.setMap(null));

        let markerProps = [];
        let markers = locations.map((location, index) => {
            //using same props in locations.js file
            let mProps = {
                key: index,
                index,
                name: location.name,
                position: location.pos,
                url: location.url
            };
            markerProps.push(mProps);
            //add animation to drop the marker on the map
            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({
                position: location.pos,
                map: this.state.map,
                animation
            });

            marker.addListener('click', () => {
                this.onMarkerClick(mProps, marker, null);
            });
            return marker;
            })
              this.setState({markers, markerProps});
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
        let amProps = this.state.activeMarkerProps;

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
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.closeInfoWindow}>
        <div>
            <h3>{amProps && amProps.name}</h3>
            {amProps && amProps.url
                ? (
                    <a href={amProps.url}>See website</a>
                )
                : ""}
        </div>
      </InfoWindow>
    </Map>
    )
  }
}

export default GoogleApiWrapper({apiKey: Map_Key})(MapDisplay)
