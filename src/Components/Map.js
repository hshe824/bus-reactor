import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, experimental,NavigationControl} from 'react-map-gl';

// var MappleToolTip = require('reactjs-mappletooltip');
import MappleToolTip from 'reactjs-mappletooltip';
const request = require('superagent');

const ACCESS_TOKEN = 'pk.eyJ1IjoicnlzaG56IiwiYSI6ImNqZTIwbWljdTFlOXMycXFseXdoZTdhMHoifQ.EaRv0yYowqeNviNdcgL-PQ' // Mapbox access token
const TRANSLINK_API_URL = 'http://api.translink.ca/rttiapi/v1/buses?apikey=iE0h8jkaEpNFmV7PrYXG';

class Map extends Component {

  constructor() {
    super()
    this.state = {
      viewport: {
        width: 1380,
        height: 720,
        latitude: 49.237368,
        longitude: -123.117362,
        zoom: 11
      },
      busDataArray: []
    };
  }

  render() {
    const { viewport } = this.state;

    return (
      
      <ReactMapGL
        {...viewport}
        style={{ width: '400px', height: '400px' }}
        mapboxApiAccessToken={ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        drag rotate
        onViewportChange={viewport => {
          this.setState({ viewport })
        }}>
        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl onViewportChange={viewport => {
          this.setState({ viewport })
        }} />
        </div>

        {this.state.busDataArray.map((busData, index) => (
          
          // <MappleToolTip key={index} float={true} mappleType={'ching'}>
          //     <div>
          //     </div>
          //     <div>
          //       Route #: {busData.routeNo} <br />
          //       Dir: {busData.direction}<br />
          //     </div>
          //   </MappleToolTip>
              <Marker 
            latitude={busData.latitude}
            longitude={busData.longitude}>
            <div className={busData.direction}>
              
            </div>
            
          </Marker>
              
        ))}
      </ReactMapGL>
    );
  }



  componentDidMount() {
   // this.timer = setInterval(() => this.getBusLocations(), 1000)
    this.getBusLocations()
  }



  processBusLocations(body) {
    var busData = this.parseJSON(body)
    this.updateBusData(busData)

  }

  updateBusData(busData) {
    this.setState(
      { busDataArray: busData }
    )
    // console.log('Bus Data:',busData)
  }


  parseJSON(json) {
    var busData = json.map((bus) =>
      (
        {
          latitude: bus.Latitude,
          longitude: bus.Longitude,
          routeNo: bus.RouteNo,
          destination: bus.Destination,
          direction: bus.Direction
        }
      ));

    return busData;

  }


  async getBusLocations() {
    request
      .get(TRANSLINK_API_URL)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || res.statusCode !== 200) {
          console.log(err)
        } else {
          this.processBusLocations(res.body)
        }
      });
  }
}


export default Map;



