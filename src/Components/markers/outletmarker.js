import React, { Component } from 'react';


class OutletMarker extends Component {
    constructor(props) {
        super(props);
    
    }


  render() {
      let vClass = "marker p" + this.props.v
    return (
        <span class={vClass} style={{"position" : "absolute", "left" : this.props.x, "top" : this.props.y}}>{this.props.a}</span>
    );
  }
}

export default OutletMarker;
