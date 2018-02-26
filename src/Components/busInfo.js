import React, {PureComponent} from 'react';

export default class BusInfo extends PureComponent {

  render() {
    const {info} = this.props;
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