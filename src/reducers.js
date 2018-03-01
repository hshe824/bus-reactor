import { combineReducers } from 'redux'

const initialViewport = {

    width: window.innerWidth,
    height: window.innerHeight,
    //Vancouver's coordinates
    latitude: 49.2527,
    longitude: -123.1207,
    zoom: 13
  
}

export function busesHaveErrored(state = false, action) {
  switch (action.type) {
      case 'BUSES_HAVE_ERRORED':
          return action.hasErrored;
      default:
          return state;
  }
}

export function busData(state = [], action) {
  switch (action.type) {
      case 'BUS_FETCH_DATA_SUCCESS':
          return action.busData;
      default:
          return state;
  }
}

export function viewport(state = initialViewport, action){
  switch (action.type) {
    case 'UPDATE_VIEWPORT':
        return action.viewport;
    default:
        return state;
  } 
}

export function popupInfo(state = null, action){
  switch (action.type) {
    case 'UPDATE_POPUP_INFO':
        return action.popupInfo;
    default:
        return state;
  } 
}
  
  export default combineReducers({
    busData,
    viewport,
    popupInfo,
    busesHaveErrored
  })

