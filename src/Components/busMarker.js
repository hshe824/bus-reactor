import React, {PureComponent} from 'react';
import '../App.css';

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

export default class BusMarker extends PureComponent {

  render() {
    const {size=20,onClick, direction} = this.props;
    let className = "businfoShort";

    if (direction=="NORTH" || direction == "SOUTH"){
      className = "businfoLong";
    }

    return (
      <img className={className} alt='' 
        onClick={onClick} src={require('../icons/bus_' +direction+ '.png')}> 
      </img>
    );
    //height={size} width ={size*2}
    //style={{...pinStyle, transform: `translate(${-size/2}px,${-size}px)`}}
  }
}