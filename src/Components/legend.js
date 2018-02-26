import React, {PureComponent} from 'react';

const defaultContainer =  ({children}) => <div className="legend">{children}</div>;

export default class Legend extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <div style={{position: 'fixed',top: '0', left: '0'}}>
          <img alt="" className = 'legend' src={ require('../icons/legend.png')} width='200' height='280'/>
        </div>
      </Container>
    );
  }
}