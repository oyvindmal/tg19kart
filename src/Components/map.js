import React, { Component } from 'react';
import OutletMarker from './markers/outletmarker'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import { Paper, Typography, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
class Map extends Component {
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
            selectedMap: 'outlet'
          };
    }

    handleClick = (e)  => {
        console.log(e.pageX + " - " + e.pageY );

        this.setState({"x" : e.pageX, "y": e.pageY});

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
             return el.type.indexOf(query) > -1;
         })
        }
     }
    componentDidMount() {
  
let urls = ['/maps/map1.json', '/maps/map2.json', '/maps/map3.json'];
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
    const { error, isLoaded, x,y, markers, open, maps, selectedMap} = this.state;
    
      if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            
    return (
    
        <><div id="debug">{selectedMap}</div>
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
                <div id="map" onClick={this.handleClick}>
                
                {this.filterItems(markers, selectedMap).map(item => (
                            <OutletMarker x={item.x} y={item.y} a={item.a} v={item.v}/>
                        ))}
                </div>
        </>
      
    );
        }
  }
}

export default Map;
