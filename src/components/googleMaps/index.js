import React, { Component } from 'react'

import { GoogleStyles } from './styles';
// import mykml from './secciones.kml';
import mykml from './distritos.kml';
import seccion from './setsion.kml';

let map = null;

let myParser

export default class Map extends Component {

    constructor(props) {

        super(props)

    }

    componentDidMount() {

        map = new window.google.maps.Map(document.getElementById('map'), {
            center: new window.google.maps.LatLng(32.653783, -115.464018),
            zoom: 13,
            mapTypeId: 'roadmap',
            styles: GoogleStyles,
        });

        myParser = new window.geoXML3.parser({ map: map });
        myParser.parse(seccion);
        console.log("se armo");

    }

    componentWillReceiveProps (nextProps) {

        // if(this.props.kmz != nextProps.kmz && nextProps.kmz != '') {

        //     if(typeof myParser === 'object') {
        //         myParser.hideDocument();
        //     }
            

        //     if(nextProps.kmz=="secciones") {

        //         myParser = new window.geoXML3.parser({ map: map });
        //         myParser.parse(mykml);

        //     } else {

        //         myParser = new window.geoXML3.parser({ map: map });
        //         myParser.parse(mykml);

        //     }

        // }

        if (this.props.lat != nextProps.lat && this.props.lng != nextProps.lng && this.props.zoom != nextProps.zoom ){
        
            var center = new window.google.maps.LatLng(nextProps.lat, nextProps.lng);
            map.panTo(center);
            map.setZoom(nextProps.zoom); 
            console.log("mapa")
            console.log(this.props.circulos)
            for (var i = this.props.circulos.length - 1; i >= 0; i--) {
               
                var lat =this.props.circulos[i]["lat"];
                var lng =this.props.circulos[i]["lng"];

                if(i===0){
                    var cityCircle = new window.google.maps.Circle({
                        strokeColor: this.props.color,
                        strokeOpacity: 1,
                        strokeWeight: 5,
                        // fillColor: '#FF0000',
                        // fillOpacity: .2,
                        map: map,
                        center: {lat: lat, lng: lng},
                        radius: 1000
                    });

                }else{
                    var cityCircle = new window.google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 1,
                        strokeWeight: 5,
                        // fillColor: '#FF0000',
                        // fillOpacity: .2,
                        map: map,
                        center: {lat: lat, lng: lng},
                        radius: 1000
                    });
                }
               


            }
            

          

        }
        
    }

    render() {
        return (
            <div style={{ height: '500px', width: '100%' }}>
                <div style={{ height: '100%', width: '100%' }} id="map"></div>
            </div>
        )
    }

}