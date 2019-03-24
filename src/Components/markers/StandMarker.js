import React, { Component } from 'react';
import {Rect,Text, Group} from 'react-konva';



class StandMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedMarker: null

        }
    
    }


    detailsClick = (object) => {
        console.log(object);
        this.setState({clickedMarker : object})
    }

  render() {
  
    return (
       
        <Group>
            <Rect onClick={() => this.detailsClick(this.props.object)} x={this.props.x} y={this.props.y} fill="white" width={this.props.w} height={40}  stroke="black" strokeWidth={2}/>
        <Text onClick={() => this.detailsClick(this.props.object)} text={this.props.description} x={this.props.x + 5} width={this.props.w} height={40} y={this.props.y+10} fontStyle="bold" fill="black" />
        </Group>
  
    );
  }
}

export default StandMarker;
