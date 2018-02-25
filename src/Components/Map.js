import React, { Component } from 'react';
import MapGL from 'react-map-gl';

class Map extends Component {

  constructor() {
    super()
    this.accessToken = 'pk.eyJ1IjoicnlzaG56IiwiYSI6ImNqZTIwbWljdTFlOXMycXFseXdoZTdhMHoifQ.EaRv0yYowqeNviNdcgL-PQ' // Mapbox access token
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 49.2827,
        longitude: -123.1207,
        zoom: 8
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
          mapboxApiAccessToken={this.accessToken}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          onChangeViewport={viewport => {
            const {latitude, longitude, zoom} = viewport;
            this.setState({ viewport })
            // Optionally call `setState` and use the state to update the map. 
          }}
          // onViewportChange={viewport => {
          //   this.setState({ viewport })
          // }}
        />
      </div>)
  }
}


export default Map;



