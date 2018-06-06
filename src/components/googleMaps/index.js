import React, { Component } from 'react'

import { GoogleStyles } from './styles';
import { ENS_54 } from './randomPoints'

import distritos from './distritos.kml';
import seccion from './setsion.kml';

import angry from './images/angry.png'
import haha from './images/haha.png'
import like from './images/like.png'
import love from './images/love.png'
import sad from './images/sad.png'
import wow from './images/wow.png'

let map = null,
    myParser,
    markers = [];

const generateIcon = () => {

    let random = (Math.floor((Math.random() * 6) + 1)) - 1;
    
    return {
        url: random == 0 ? angry :
            (random == 1 ? haha :
            (random == 2 ? like :
            (random == 3 ? love :
            (random == 4 ? sad : wow)))),

        size: new window.google.maps.Size(60, 60),

        scaledSize: new window.google.maps.Size(40, 40),
        
        origin: new window.google.maps.Point(-15,0)
    }

}

export default class Map extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        map = new window.google.maps.Map(document.getElementById('map'), {
            center: new window.google.maps.LatLng(31.8730604,-116.5898908),
            zoom: 13.14,
            mapTypeId: 'roadmap',
            styles: GoogleStyles,
        });

        /**
         *
         * CODIGO PARA PONER UN KML
         *
         */
        
        // myParser = new window.geoXML3.parser({ map: map });
        // myParser.parse(seccion);
        // console.log("se armo");
        
        /**
         *
         * CODIGO PARA PONER UN MARCADOR
         *
         */

        // var image = {
        //     url: myIcon[2],
        //     size: new window.google.maps.Size(60, 60),
        //     scaledSize: new window.google.maps.Size(40, 40),
        //     origin: new window.google.maps.Point(-15,0)
        // }
        // var image2 = 'https://i.imgur.com/wVAJS8Tr.png';

        // for(let x=0 ; x<15 ; x++) {

        //     let randompos = Math.floor(Math.random() * (100 - 1)) + 1;
        //     let latlng = new window.google.maps.LatLng( ENS_54[randompos]["Lat"], ENS_54[randompos]['Lng'] );

        //     var marker = new window.google.maps.Marker({
        //         position : latlng,
        //         map: map,
        //         title: 'Hello World!',
        //         icon : generateIcon(),
        //         animation: window.google.maps.Animation.BOUNCE,
        //     });

        //     marker.setMap(map);
        //     markers.push(marker);
           
        // }

        /**
         *
         * CODIGO PARA GENERAR UN CIRCULO EN EL MAPA
         *
         */
         var cityCircle = new window.google.maps.Circle({
            strokeColor: '#1E90FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#1E90FF',
            fillOpacity: 0.35,
            map: map,
            center: {lat: 31.832876, lng: -116.597712},
            radius: 1000
        });

         /**
          *
          * CODIGO PARA POSICIONAR EL MAPA EN UNAS COORDENADAS
          *
          */
        // var center = new window.google.maps.LatLng(nextProps.lat, nextProps.lng);
        // map.panTo(center);
        
        let myoverlay = new window.google.maps.OverlayView();
        myoverlay.draw = function () { this.getPanes().markerLayer.id='markerLayer'; };
        myoverlay.setMap(map);

    }

    componentWillReceiveProps (nextProps) {

        /**
         *
         * SI LA LATITUD Y LONGITUS HA CAMBIADO
         * O SI EL ZOOM HA CAMBIADO
         *
         */
        
        if ((this.props.lat != nextProps.lat && 
            this.props.lng != nextProps.lng) || 
            this.props.zoom != nextProps.zoom ) {
        
                var center = new window.google.maps.LatLng(nextProps.lat, nextProps.lng);
                map.panTo(center);
                map.setZoom(nextProps.zoom);

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