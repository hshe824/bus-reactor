import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import Legend from './legend';
import BusMarker from './busMarker';
import BusInfo from './busInfo';

const request = require('superagent');

const ACCESS_TOKEN = 'pk.eyJ1IjoicnlzaG56IiwiYSI6ImNqZTIwbWljdTFlOXMycXFseXdoZTdhMHoifQ.EaRv0yYowqeNviNdcgL-PQ' // Mapbox access token
const TRANSLINK_API_URL = 'http://api.translink.ca/rttiapi/v1/buses?apikey=iE0h8jkaEpNFmV7PrYXG';

/**
 * Represents the underlying main Map-GL object for the app
 * @class
 */
export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight,
        //Vancouver's coordinates
        latitude: 49.2527,
        longitude: -123.1207,
        zoom: 13
      },
      busDataArray: [],
      popupInfo: null
    };
  }

  //Fetch new API bus data every 500ms
  componentDidMount() {
    this.timer = setInterval(() => this.getBusLocations(), 500)
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

  processBusLocations(body) {
    var data = this.parseJSON(body)
    this.updateBusDataArray(data)
  }

  //Parse the JSON for desired fields
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

  updateBusDataArray(data) {
    this.setState(
      { busDataArray: data }
    )
  }

  render() {
    const { viewport } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        drag rotate
        onViewportChange={viewport => {
          this.setState({ viewport })
        }}>

        {this.state.busDataArray.map(this._renderBusMarker)}
        {this._renderBusPopup()}

        <div className='navControl'>
          <NavigationControl onViewportChange={viewport => {
            this.setState({ viewport })
          }} />
        </div>

        <Legend containerComponent={this.props.containerComponent} />
      </ReactMapGL>
    );
  }

  //Render the toggleable popups on each bus marker
  _renderBusPopup() {
    const { popupInfo } = this.state;
    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({ popupInfo: null })}
      >
        <BusInfo info={popupInfo} />
      </Popup>
    );
  }

  //Render the custom bus markers on each bus marker
  _renderBusMarker = (busData, index) => {
    return (
      <Marker className='marker' key={index}
        captureClick={false}
        latitude={busData.latitude}
        longitude={busData.longitude}>
        <BusMarker onClick={() => this.setState({ popupInfo: busData })} direction={busData.direction} />
      </Marker>
    );
  }
}


