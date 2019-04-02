import React, { Component } from 'react';

import CanvasMarker from './markers/CanvasMarker'
import StandMarker from './markers/StandMarker'
import AreaMarker from './markers/AreaMarker'
import TextLabel from './markers/TextLabel'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import { Paper, Typography, DialogTitle, List, ListItem, ListItemText, AppBar, Toolbar } from '@material-ui/core';

import { Stage, Layer, Circle, Text, Image, Rect } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
const Hallkart = () => {
    const [image] = useImage('/tg19cad.png');
    return <Image image={image} x={0} y={0}/>;
  };

  const Tglogo = () => {
    const [image] = useImage('/tglogo.png');
    return <Image image={image} x={1750} y={1000}/>;
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
            selectedMap: 'stand',
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
            <AppBar position="absolute" color="inherit">
                <Toolbar>
                    <Typography variant="h6">The Gathering 2019 - Arbeidskart</Typography>
                    
                    <Typography variant="button" style={{"padding-left": "10px"}}>Aktivt kartlag:</Typography>
                    <Typography variant="overline" style={{"padding-left": "10px"}}>{this.getDisplayName(selectedMap)}</Typography>
                    <Typography variant="button" style={{"padding-left": "10px"}}>Punkt:</Typography>
                    <Typography variant="overline" style={{"padding-left": "10px", "flexGrow" : 1}}>{x},{y}</Typography>
                    <Button variant="extendedFab" size="small" color="inherit"  onClick={this.handleOpen}><Icon>map</Icon> Velg kartlag</Button>
                </Toolbar>
            </AppBar>
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
   
        <Stage width={1920} height={1080} onClick={this.handleClick} preventDefault="false">
        <Layer>
        <Rect x={0} y={0} fill="white" width={1920} height={1080}  />
          <Hallkart />

          <AreaMarker x={460} y={320} w={250} h={180} description="Sektor 8" fill="#F68D1E" />
          <AreaMarker x={740} y={320} w={200} h={180} description="Scene" fill="#0CA5C7" />
          <AreaMarker x={970} y={320} w={200} h={180} description="Sektor 4" fill="#F68D1E" />
          <AreaMarker x={1200} y={320} w={300} h={180} description="Sektor 2" fill="#F68D1E" />


          <AreaMarker x={510} y={550} w={200} h={180} description="Sektor 7" fill="#EE255C" />   
          <AreaMarker x={740} y={550} w={200} h={70} description="Sektor 5" fill="#EE255C" />        
          <AreaMarker x={970} y={550} w={200} h={180} description="Sektor 3" fill="#EE255C" />   
          <AreaMarker x={1200} y={550} w={220} h={180} description="Sektor 1" fill="#EE255C" />      


           <AreaMarker x={740} y={630} w={200} h={100} description="Elkjøp shop" fill="#58595B" />

            
          <AreaMarker x={1430} y={550} w={130} h={45} description="Info" fill="#50B848" />      
          <AreaMarker x={1430} y={595} w={130} h={45} description="Shop" fill="#7AC470" />    
          <AreaMarker x={1430} y={650} w={130} h={70} description="Crew" fill="#58595B" />    

          <AreaMarker x={755} y={113} w={130} h={45} description="TVbuss" fill="#58595B" />

          <TextLabel x={120} y={500} w={150} h={45} description="Auditorium" />
          <TextLabel x={583} y={950} w={150} h={45} description="Resepsjon" />
          <TextLabel x={583} y={1000} w={190} h={45} description="Hovedinngang" />
          <TextLabel x={1757} y={710} w={100} h={45} description="Sørport" />
          <TextLabel x={145} y={691} w={120} h={45} description="Nordport" />

          <Tglogo />
          {this.filterItems(markers, selectedMap).map(item => (
                this.renderMarker(item)
            ))}
      <Circle x={this.state.x} y={this.state.y} radius={10} stroke="black" strokeWidth={2} fill="green" />
        </Layer>
   
    
      </Stage>
       </>
    );
        }
  }
}

export default CanvasMap;
