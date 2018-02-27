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
    let className = "businfoShort";
    if (direction == "NORTH" || direction == "SOUTH") {
      className = "businfoLong";
    }

    return (
      <img className={className} alt=''
        onClick={onClick} src={require('../icons/bus_' + direction + '.png')}>
      </img>
    );
  }
}