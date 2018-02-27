import React, { Component } from 'react';

/**
 * Class the represents the bus direction legend that shows on the map
 * @class
 */
export default class Legend extends Component {
  render() {
    return (
        <div className='busLegendDiv'>
          <img className='legendImage' alt="" src={require('../icons/legend.png')} />
        </div>
    );
  }
}