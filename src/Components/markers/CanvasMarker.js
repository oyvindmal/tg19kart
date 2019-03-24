import React, { Component } from 'react';
import {Rect,Text, Group} from 'react-konva';

class CanvasMarker extends Component {
    constructor(props) {
        super(props);
       
    
    }

    getColor = (v) => {
        if(v == 230) {
            return "blue"
        }

        return "red"
    }
  render() {

    return (
        <Group>
            <Rect x={this.props.x} y={this.props.y} fill={this.getColor(this.props.v)} width={30} height={30}  stroke="black" strokeWidth={2}/>
        <Text text={this.props.a} x={this.props.x + 5} y={this.props.y+10} fontStyle="bold" fill="white" />
        </Group>
    );
  }
}

export default CanvasMarker;
