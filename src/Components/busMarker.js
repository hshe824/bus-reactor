import React, {PureComponent} from 'react';

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

export default class BusMarker extends PureComponent {

  render() {
    const {size=20,onClick, direction} = this.props;

    return (
      <img className="busicon" alt='' height={size} width ={size*2}
        style={{...pinStyle, transform: `translate(${-size/2}px,${-size}px)`}}
        onClick={onClick} src={require('../icons/bus_' +direction+ '.png')}> 
      </img>
    );
  }
}