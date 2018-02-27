import React, { Component } from 'react';
import '../App.css';

/**
 * Class the represents each BusMarker that shows a bus's location on the map
 * @class
 */
export default class BusMarker extends Component {

  render() {
    const { onClick, direction } = this.props;

    // Set the icon based on the direction the bus is travelling in
    let className = "busMarkerShort";
    if (direction == "NORTH" || direction == "SOUTH") {
      className = "busMarkerLong";
    }

    return (
      <img className={className} alt=''
        onClick={onClick} src={require('../icons/bus_' + direction.toLowerCase() + '.png')}>
      </img>
    );
  }
}