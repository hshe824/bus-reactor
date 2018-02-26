import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl} from 'react-map-gl';
import Legend from './legend';
import BusMarker from './busMarker';
import BusInfo from './busInfo';

const request = require('superagent');

const ACCESS_TOKEN = 'pk.eyJ1IjoicnlzaG56IiwiYSI6ImNqZTIwbWljdTFlOXMycXFseXdoZTdhMHoifQ.EaRv0yYowqeNviNdcgL-PQ' // Mapbox access token
const TRANSLINK_API_URL = 'http://api.translink.ca/rttiapi/v1/buses?apikey=iE0h8jkaEpNFmV7PrYXG';

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: this.props.width || window.innerWidth,
        height: this.props.height -100|| window.innerHeight-100,
        latitude: 49.237368,
        longitude: -123.117362,
        zoom: 11
      },
      busDataArray: [],
      popupInfo: null
    };
  }

  _renderPopup() {
    const {popupInfo} = this.state;
    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({popupInfo: null})} 
        >
        <BusInfo info={popupInfo} />
      </Popup>
    );
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
              captureClick={false}
            latitude={busData.latitude}
            longitude={busData.longitude}>
             <BusMarker onClick={() => this.setState({popupInfo: busData})} direction={busData.direction} />
          </Marker>
              
        ))}
        {this._renderPopup()}

        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl onViewportChange={viewport => {
          this.setState({ viewport })
        }} />
        </div>

      <Legend containerComponent={this.props.containerComponent} />
      </ReactMapGL>
    );
  }



  componentDidMount() {
   this.timer = setInterval(() => this.getBusLocations(), 500)
    //  this.getBusLocations()
  }



  processBusLocations(body) {
    var data = this.parseJSON(body)
    this.updateBusDataArray(data)

  }

  updateBusDataArray(data) {
    this.setState(
      { busDataArray: data }
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



