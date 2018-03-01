import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import configureStore from '../store/configureStore';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { fetchBusData, updateViewport,busesHaveErrored, updatePopupInfo, processBusLocations } from '../actions';
const request = require('superagent');

it('store initialises correctly', () => {

  const expectedStore = {
    busData: [],
    busesHaveErrored: false,
    popupInfo: null,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight, 
      latitude: 49.2527, 
      longitude: -123.1207, 
      zoom: 13},
  }
  const store = configureStore() ;
  expect(store.getState()).toEqual(expectedStore);

});

it('updates PopupInfo correctly', () => {
  const store = configureStore();

  const updatedPopupInfo = {
      latitude: 100,
      longitude: 100,
      routeNo: 1,
      destination: "DOWNTOWN",
      direction: "SOUTH"

  }

  store.dispatch(updatePopupInfo(updatedPopupInfo));
  expect(store.getState().popupInfo).toEqual(updatedPopupInfo);

});

it('deletes PopupInfo correctly', () => {
  const store = configureStore();

  expect(store.getState().popupInfo).toEqual(null);

  const updatedPopupInfo = {
      latitude: 100,
      longitude: 100,
      routeNo: 1,
      destination: "DOWNTOWN",
      direction: "SOUTH"

  }

  store.dispatch(updatePopupInfo(updatedPopupInfo));
  expect(store.getState().popupInfo).toEqual(updatedPopupInfo);
  store.dispatch(updatePopupInfo(null));
  expect(store.getState().popupInfo).toEqual(null);

});

it('updates Mapbox GL viewport correctly', () => {
    const store = configureStore();

    const updatedViewport = {
      width: 500,
      height: 500, 
      latitude: 100, 
      longitude: -100, 
      zoom: 5
    }

    store.dispatch(updateViewport(updatedViewport));
    expect(store.getState().viewport).toEqual(updatedViewport);

});

