import React, { Component } from 'react';
// import superagent from 'superagent';
import MapGL from 'react-map-gl';

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
      }
    };
  }

  render() {
    const { viewport } = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          style={{ width: '400px', height: '400px' }}
          mapboxApiAccessToken={ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          onViewportChange={viewport => {
            this.setState({ viewport })
          }
          }
        />
      </div>)   
  }

  componentDidMount() {
    this.getBusLocations()
  }

  

  processBusLocations(body){
    var busData = this.parseJSON(body)
   
  }


  parseJSON(json){
    console.log(json)
  }


  getBusLocations() {
     request
    .get(TRANSLINK_API_URL)
    .set('Accept', 'application/json')
    .buffer(true)
    .end((err, res) => {
      this.processBusLocations(res.body)
   });
  }
}


export default Map;



