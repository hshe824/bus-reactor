import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import Legend from './legend';
import BusMarker from './busMarker';
import BusInfo from './busInfo';
import { connect } from 'react-redux';
import { fetchBusData, updateViewport, updatePopupInfo, busesHaveErrored} from '../actions.js';

const ACCESS_TOKEN = 'pk.eyJ1IjoicnlzaG56IiwiYSI6ImNqZTIwbWljdTFlOXMycXFseXdoZTdhMHoifQ.EaRv0yYowqeNviNdcgL-PQ' // Mapbox access token
const TRANSLINK_API_URL = 'http://api.translink.ca/rttiapi/v1/buses?apikey=iE0h8jkaEpNFmV7PrYXG';

/**
 * Represents the underlying main Map-GL object for the app
 * @class
 */
class Map extends Component {

  constructor(props) {
    super(props);
    this._renderBusMarker = this._renderBusMarker.bind(this);
    this._renderBusPopup = this._renderBusPopup.bind(this);
  }

  //Fetch new API bus data every 500ms
  componentDidMount() {
    this.props.fetchData(TRANSLINK_API_URL);
    this.timer = setInterval(() => this.props.fetchData(TRANSLINK_API_URL), 500);
  }

  render() {
    console.debug(this.props)
    const { viewport } = this.props;

    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        drag rotate
        onViewportChange={this.props.updateViewport}>

        {/* Render each bus marker */}
        {this.props.busData.map(this._renderBusMarker)}
        
        {/* Render bus popup */}
        {this._renderBusPopup()}

        <div className='navControl'>
          <NavigationControl 
          onViewportChange= {this.props.updateViewport}
         />
        </div>

        <Legend containerComponent={this.props.containerComponent} />
      </ReactMapGL>
    );
  }

  //Render the toggleable popups on each bus marker
  _renderBusPopup() {
    const { popupInfo } = this.props;
    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.props.updatePopupInfo(null)}
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
        <BusMarker onClick={() => this.props.updatePopupInfo(busData)} 
        direction={busData.direction} />
      </Marker>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      busData: state.busData,
      hasErrored: state.busesHaveErrored,
      viewport: state.viewport,
      popupInfo: state.popupInfo
      };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(fetchBusData(url)),
      updateViewport: (viewport) => dispatch(updateViewport(viewport)),
      updatePopupInfo: (popupInfo) => dispatch(updatePopupInfo(popupInfo)),
      busesHaveErrored: (bool) => dispatch(busesHaveErrored(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
