import React, { Component } from 'react';

import CanvasMarker from './markers/CanvasMarker'
import StandMarker from './markers/StandMarker'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import { Paper, Typography, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';

import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
const Hallkart = () => {
    const [image] = useImage('/tg19-2.png');
    return <Image image={image} x={0} y={0}/>;
  };


  
  
class CanvasMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            markers: null,
            x:0,
            y:0,
            open: false,
            maps: null,
            selectedMap: 'outlet',
            clickedMarker: null
          };
    }
    renderMarker(item)
    {
        switch(item.Marker)
        {
            case "stand" : return <StandMarker x={item.x} y={item.y} w={item.width} description={item.description} object={item}/>;
            default: return <CanvasMarker x={item.x} y={item.y} a={item.a} v={item.v} object={item}/>;
        }
    }
    handleClick = (e)  => {
 

        this.setState({"x" : e.evt.clientX, "y": e.evt.clientY});

    }
    handleSelectLayer = (layer) => {
        this.setState({selectedMap: layer});
    }

    isLayerActive = (layer) => {
       
        if(layer === this.state.selectedMap){
            return true;
        }

        return false;
    }
    handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
      filterItems = (arr1, query) => {
        if(query == null) {
            return arr1;
        }
 
        else {
         return arr1.filter(function(el) {
            
             return el.type === query;
         })
        }
     }
     handleIt = (object) => {
         this.setState(object);
     }
     getDisplayName = (filename) => {
            let outvar = "NA"
             this.state.maps.forEach((value) => {
                
             if(value.Filename === filename){
                outvar = value.DisplayName;
             }
         })

         return outvar;
     }
    componentDidMount() {
  
let urls = ['/maps/map1.json', '/maps/sponsorer.json'];
let arr = [];
fetch('/maps/maps.json').then(response => response.json()).then(
    results => {
        this.setState({maps: results});
    }
)
Promise.all(urls.map(url =>
    fetch(url).then(response => response.json())
)).then(results => {
    results.forEach(result => {
        arr = arr.concat(result)

        this.setState({markers: arr, isLoaded: true})
    });
});






    }
  render() {
    const { error, isLoaded, x,y, markers, open, maps, selectedMap, clickedMarker} = this.state;
    
      if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {

    return (
       <>
       <div id="debug">Aktivt kartlag:<br/>{this.getDisplayName(selectedMap)}</div>
               <Dialog         open={open}
          onClose={this.handleClose}>
            <DialogTitle id="simple-dialog-title">Velg kartlag</DialogTitle>
            <div>
                <List>
                    {maps.map(item => (
                        <ListItem button onClick={() => this.handleSelectLayer(item.Filename)} selected={this.isLayerActive(item.Filename)}>
                        <ListItemText primary={item.DisplayName} />
                        </ListItem>
                    ))}
                </List>
        </div>
        </Dialog>
        <div class="displayClick">{x},{y}</div>
        <Button variant="fab" color="default" id="mapLayerButton" onClick={this.handleOpen}><Icon>map</Icon></Button>
        <Stage width={1920} height={1080} onClick={this.handleClick}>
        <Layer>
          
          <Hallkart />
          {this.filterItems(markers, selectedMap).map(item => (
                this.renderMarker(item)
            ))}
      
        </Layer>
    
      </Stage>
       </>
    );
        }
  }
}

export default CanvasMap;
