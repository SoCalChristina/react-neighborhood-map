import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import ErrorAlert from './ErrorAlert';
//Tutorial source: https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be
//declare map api as a constant with API keys
const MAP_KEY = 'AIzaSyBVMw1jhal8PJLsikGso7YOp-qqDHATDC4'; //use with GoogleApiWrapper component
const FS_CLIENT = 'CXKH1EGY1G5CKFK1I2OTHS4GKIFMSRN3FLSLPH5QNBP3YWV3';
const FS_SECRET = 'EEFMX2QAOHSKBC0MGMDIBHIYDUP4M50PVMXB1LDVD0XEPGGS';
const FS_VERSION = "20181101";

class MapDisplay extends Component {
    state = {
        map: null,
        //source for props: https://reactjs.org/docs/components-and-props.html
        //list of all markerProps
        markers: [],
        //list of all properites related to markers
        markerProps: [],
        //track active marker
        activeMarker: null,
        //track props for active markers
        activeMarkerProps: null,
        //track if info window should show
        showingInfoWindow: false
    };

    componentDidMount = () => {}

    componentWillReceiveProps = (props) => {
        this.setState({firstDrop: false});

        // update markers with location changes
        if (this.state.markers.length !== props.Locations.length) {
            this.closeInfoWindow();
            this.updateMarkers(props.Locations);
            this.setState({activeMarker: null});

            return;
        }

        // close current info window when selected markers don't match
        if (!props.selectedIndex || (this.state.activeMarker &&
            (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
            this.closeInfoWindow();
        }

        // check for for selected index
        if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined") {
            return;
        };
        // Treat the marker as clicked
        this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
    }

    mapReady = (props, map) => { //pass the props and map once map is loaded
        this.setState({map});
        this.updateMarkers(this.props.Locations);
      //  this.customMarkers(this.props.style);
    }

    closeInfoWindow = () => {
        // Disable currently active animation on markers
        this.state.activeMarker && this
            .state
            .activeMarker
             //documentation for marker animation: https://developers.google.com/maps/documentation/javascript/examples/marker-animations
            .setAnimation(null);
       this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});
    }
//look for foursquare data match to hard coded data in Locations.json
    getBusinessInfo = (props, data) => {
        //get matching data
        return data
            .response
            .venues
          //filter to get list of matching data
            .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
        }

    onMarkerClick = (props, marker, e) => {
        // Close open info windows
        this.closeInfoWindow();

        //Documentation on fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // Fetch the FourSquare data for the selected taco truck: radius set to 250 yards of ll (latitude and longitude), ll accuracy set to within 200 yards
        let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=250&ll=${props.position.lat},${props.position.lng}&llAcc=200`;
        let headers = new Headers();
        let request = new Request(url, {
            method: 'GET',
                headers
        });

        // fetch props for active marker
        let activeMarkerProps;
        fetch(request){
          //credentials: 'omit'
        })
            .then(response => response.json()) //parses response to JSON
            .then(result => {
                // Get specified venue data from foursquare
                // return
                let restaurant = this.getBusinessInfo(props, result);
                activeMarkerProps = {
                    ...props,
                    //first result in array becomes foursquare data to be used in app
                    foursquare: restaurant[0]
                };
                 // use foursquare data results to retrieve the images (if available) for data results
                if (activeMarkerProps.foursquare) {
                    // use foursquare photo api
                    let url = `https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}`;
                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                            activeMarkerProps = {
                                ...activeMarkerProps,
                                //images uses photos properties results
                                images: result.response.photos
                        };
                        if (this.state.activeMarker)
                            this.state.activeMarker.setAnimation(null);
                            marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                            this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
                        })
                    } else {
                    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                    this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
                }
            })
        }


    updateMarkers = (Locations) => {
        // finished after all Locations filtered
        if (!Locations)
        return;

        // Clear all markers from the map
        this
            .state
            .markers
            .forEach(marker => marker.setMap(null));
        //iterate over Locations for marker properties
        //place markers on the map
        let markerProps = [];
        let markers = Locations.map((location, index) => {
            // using same props in locations.js file
            let mProps = {
              //source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
                key: index,
                index,
                name: location.name,
                position: location.pos,
                street: location.street,
                city: location.city,
                state: location.state,
                zip: location.zip,
                url: location.url,
                // displays address in standard form. This will display street address
                formattedAddress: location.formattedAddress,
              //  TODO add contact field and formatted telephone number
            };

            markerProps.push(mProps);
            //add animation to drop the marker on the map
            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this
                .props
                .google
                .maps
                .Marker({position: location.pos, map: this.state.map, animation});
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
            height: '100vh'
        }

        const center = {
        // using the google maps format of lat and lon not FS lat and lng
            lat: this.props.lat,
            lng: this.props.lon
        }
        let amProps = this.state.activeMarkerProps;

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.mapReady}
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={center}
                onClick={this.closeInfoWindow}>
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.closeInfoWindow}>
                <div>
                    <h3>{amProps && amProps.name}</h3>
                    {/*add address below Taco Truck name */}
                    <p>{amProps && amProps.formattedAddress}</p>
                    {/*add link to business url. Here, I'm linking to Facebook pages because none of the Taco Trucks have websites */}
                    {amProps && amProps.url
                        ? (
                            <a href={amProps.url}>website</a>
                        )
                        : ""}
                    {amProps && amProps.images
                        ? (
                            <div><img
                                alt={amProps.name + " food picture"}
                                src={amProps.images.items[0].prefix + "100x100" + amProps.images.items[0].suffix}/>
                                {/*use language suggested by FourSquare for visual attributions*/}
                                {/* see: https://developer.foursquare.com/docs/terms-of-use/attribution*/}
                                <p>Powered By Foursquare</p>
                            </div>
                        )
                        : ""
                    }
                </div>
            </InfoWindow>
        </Map>
    )
  }
}

export default GoogleApiWrapper({apiKey: MAP_KEY, LoadingContainer: ErrorAlert})(MapDisplay)
