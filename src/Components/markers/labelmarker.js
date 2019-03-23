import React, { Component } from 'react';


class LabelMarker extends Component {
    constructor(props) {
        super(props);
    
    }


  render() {
      let vClass = "labelmarker"
    return (
        <span class={vClass} style={{"position" : "absolute", "left" : this.props.x, "top" : this.props.y}}>{this.props.a}</span>
    );
  }
}

export default LabelMarker;
