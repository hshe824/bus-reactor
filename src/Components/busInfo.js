import React, { Component } from 'react';

/**
 * Class the represents the information shown in the toggleable popup of each bus marker
 * @class
 */
export default class BusInfo extends Component {

  render() {
    const { info } = this.props;
    return (
      <div>
        <div>
          Route #: {info.routeNo}
        </div>
        <div>
          Destination: {info.destination}
        </div>
      </div>
    );
  }
}