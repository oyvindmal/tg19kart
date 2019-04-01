import React, { Component } from 'react';
import {Rect,Text, Group} from 'react-konva';

class TextLabel extends Component {
    constructor(props) {
        super(props);
    
    }


  render() {
  
    return (
        <Group>
        <Rect  x={this.props.x} y={this.props.y} fill="#F36C2E" width={this.props.w} height={this.props.h}  stroke="black" strokeWidth={0}/>
    <Text  text={this.props.description} x={this.props.x + 5} width={this.props.w} height={this.props.h} y={this.props.y+10} fontStyle="bold" fontSize={25} fill="white" />
    </Group>
    );
  }
}

export default TextLabel;
