
const request = require('superagent');
const TRANSLINK_API_URL = 'http://api.translink.ca/rttiapi/v1/buses?apikey=iE0h8jkaEpNFmV7PrYXG';


export function busesHaveErrored(bool) {
  return {
      type: 'BUSES_HAVE_ERRORED',
      hasErrored: bool
  };
}

export function busFetchDataSuccess(busData) {
  return {
      type: 'BUS_FETCH_DATA_SUCCESS',
      busData
  };
}

export function updateViewport(viewport){
  return {
    type: 'UPDATE_VIEWPORT',
    viewport
  };
}

export function updatePopupInfo(popupInfo){
  return {
    type: 'UPDATE_POPUP_INFO',
    popupInfo
  };
}

//Call the Translink API to fetch bus locations
export function fetchBusData(data) {
    return (dispatch) => {
      request
      .get(TRANSLINK_API_URL)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || res.statusCode !== 200) {
          dispatch(busesHaveErrored(true));
        } else {
          dispatch(processBusLocations(res.body));
        }
      });

    }
  }

//Map the attributes we are interested in from the response
export function processBusLocations(buses) {
  return (dispatch) => {
  var busData = buses.map((bus) =>
  (
    {
      latitude: bus.Latitude,
      longitude: bus.Longitude,
      routeNo: bus.RouteNo,
      destination: bus.Destination,
      direction: bus.Direction
    }
  ));
  dispatch(busFetchDataSuccess(busData));
}
}
