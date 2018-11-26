import React, {Component} from 'react';
//add an image to react. Source: https://stackoverflow.com/questions/37644265/correct-path-for-img-on-react-js
import logo from './images/taco-truck.png';
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './components/MapDisplay';
import ListDrawer from './components/ListDrawer';

class App extends Component {
    state = {
        lat: 34.1975048,
        lon: -119.1770516,
        all: locations,
        zoom: 13,
        open: false

    }

    styles = {
        menuButton: {
            marginLeft: 10,
            marginRight: 20,
            position: "absolute",
            left: 10,
            top: 20,
            background: "white",
            padding: 10
        },
        hide: {
            display: 'none'
        },
        header: {
            marginTop: "0px"
        }
      };

      componentDidMount = () => {
        this.setState({
          ...this.state,
          filtered: this.filterLocations(this.state.all, "")
        });
      }

      toggleDrawer = () => {
        // Toggle the value controlling whether the drawer is displayed
          this.setState({
              open: !this.state.open
          });
      }

      updateQuery = (query) => {
        // Update the query value and filter the list of locations accordingly
          this.setState({
              ...this.state,
              selectedIndex: null,
              filtered: this.filterLocations(this.state.all, query)
          });
      }

      filterLocations = (locations, query) => {
          // Filter locations to match query string
          return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
      }

      clickListItem = (index) => {
          // Set the state to reflect the selected location array index
          this.setState({ selectedIndex: index, open: !this.state.open })
      }

      render = () => {
          return (
              <div className="App">
                  <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
                      <i className="fa fa-bars"></i>
                  </button>
              {/*}<div className="app-header"> */}
                  <div className="app-header">
                    <h1>Oxnard Taco Track</h1>
                {/*  </div>
                  <div className="logo">  */}
                        <img src={logo} className="app-logo" alt={"taco truck logo"} />
        {/* </div> */}
                  </div>

                  <MapDisplay
                      lat={this.state.lat}
                      lon={this.state.lon}
                      zoom={this.state.zoom}
                      locations={this.state.filtered}
                      selectedIndex={this.state.selectedIndex}
                      clickListItem={this.clickListItem}/>
                  <ListDrawer
                      locations={this.state.filtered}
                      open={this.state.open}
                      toggleDrawer={this.toggleDrawer}
                      filterLocations={this.updateQuery}
                      clickListItem={this.clickListItem}/>
                  </div>
              );
          }
      }



export default App;
