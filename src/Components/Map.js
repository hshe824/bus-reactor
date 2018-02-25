import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, experimental,NavigationControl} from 'react-map-gl';
import Legend from './legend';
import MappleToolTip from 'reactjs-mappletooltip';
const request = require('superagent');




const ACCESS_TOKEN = 'pk.eyJ1IjoicnlzaG56IiwiYSI6ImNqZTIwbWljdTFlOXMycXFseXdoZTdhMHoifQ.EaRv0yYowqeNviNdcgL-PQ' // Mapbox access token
const TRANSLINK_API_URL = 'http://api.translink.ca/rttiapi/v1/buses?apikey=iE0h8jkaEpNFmV7PrYXG';

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight,
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
        style={{ width: window.innerWidth, height: window.innerHeight }}
        mapboxApiAccessToken={ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        drag rotate
        onViewportChange={viewport => {
          this.setState({ viewport })
        }}>
       

        {this.state.busDataArray.map((busData, index) => (
              <Marker className='marker' key={index}
            latitude={busData.latitude}
            longitude={busData.longitude}>
            <div className={busData.direction}>
              
            </div>
            
          </Marker>
              
        ))}

        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl onViewportChange={viewport => {
          this.setState({ viewport })
        }} />
        </div>

      <Legend className='legend' containerComponent={this.props.containerComponent} />
      </ReactMapGL>
    );
  }



  componentDidMount() {
   this.timer = setInterval(() => this.getBusLocations(), 1500)
    // this.getBusLocations()
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



