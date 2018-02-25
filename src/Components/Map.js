import React, { Component } from 'react';
import ReactMapGL,{Marker} from 'react-map-gl';

const request = require('superagent');

const ACCESS_TOKEN = 'pk.eyJ1IjoicnlzaG56IiwiYSI6ImNqZTIwbWljdTFlOXMycXFseXdoZTdhMHoifQ.EaRv0yYowqeNviNdcgL-PQ' // Mapbox access token
const TRANSLINK_API_URL ='http://api.translink.ca/rttiapi/v1/buses?apikey=iE0h8jkaEpNFmV7PrYXG';

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
      busDataArray : []
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
          {/* <Layer type="symbol">
					  {this.props.eventMarkers.map(this._renderMarkers)}
          </Layer>   */}
          {/* <Marker latitude={49.237368} longitude={-123.117362} offsetLeft={-20} offsetTop={-10}>
          <div className="busImage"></div>
          </Marker> */}

           {this.state.busDataArray.map ((busData) => (
            <Marker 
            latitude={busData.latitude} 
            longitude={busData.longitude} 
            offsetLeft={-20} 
            offsetTop={-10}>
            <div className="busImage"></div>
            </Marker>
))}
          </ReactMapGL> 
        );
  }



  componentDidMount() {
    this.getBusLocations()
  }

  

  processBusLocations(body){
    var busData = this.parseJSON(body)
    this.updateBusData(busData)
   
  }

  updateBusData(busData){
    this.setState(
      {busDataArray:busData}
    )
    console.log('Bus Data:',busData)
  }


  parseJSON(json){
    var busData = json.map((bus) =>
    (
      {latitude : bus.Latitude,
    longitude : bus.Longitude,
    routeNo : bus.RouteNo,
    destination : bus.Destination,
    direction : bus.Direction
    }
  ));

    return busData;
     
  }


  getBusLocations() {
     request
    .get(TRANSLINK_API_URL)
    .set('Accept', 'application/json')
    .buffer(true)
    .end((err, res) => {
      if (err || res.statusCode !== 200){
        console.log(err)
      } else{
      this.processBusLocations(res.body)
      }
    });
  }
}


export default Map;



