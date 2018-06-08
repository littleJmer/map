import React, { Component } from 'react'

import { GoogleStyles } from './styles';
import { ENS_54 } from './randomPoints'
import { connect } from 'react-redux'

import distritos from './distritos.kml';
import secciones from './setsion.kml';
import Se400 from './seccionesconcolores.kml';

import angry from './images/angry.png';
import haha from './images/haha.png';
import like from './images/like.png';
import love from './images/love.png';
import sad from './images/sad.png';
import wow from './images/wow.png';

import * as actions from '../../actions/secciones.js';

let map = null,
    myParser,
    markers = [],
    circles = [];

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

 class Map extends Component {

    constructor(props) {
        super(props)
        this.state={
            coord : '',
        }


    }



    componentDidMount() {

        let _self = this;

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
        // myParser.parse(Se400);

        map.addListener('click', function(e) {
            console.log(e);
          });

        var marker = new window.google.maps.Marker({
            position: {lat: -25.363, lng: 131.044},
            map: map,
            title: 'Hello World!'
          });

        marker.addListener('click', function(e) {
            console.log(e.latLng.lat());
          });


        // assign "useTheData" as the after parse function
        var geoXml = new window.geoXML3.parser({map: map, afterParse: useTheData, singleInfoWindow: true,});
        geoXml.parse(Se400); 

        // function to retain closure on the placemark and associated text
        function bindPlacemark(placemark, obj) {
            window.google.maps.event.addListener(placemark,"click", function() {
                //action
                _self.props.getInfo(obj.name);
                console.log(placemark)
                
                console.log(obj)

            });


        }

        // "afterParse" function, adds click listener to each placemark to "alert" the name
        function useTheData(doc) {
          for (var i = 0; i < doc[0].placemarks.length; i++) {
            var placemark = doc[0].placemarks[i].polygon || doc[0].placemarks[i].marker || doc[0].placemarks[i].polyline;
            bindPlacemark(placemark, doc[0].placemarks[i]);
           
        }
          
        };
        
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
        //  var cityCircle = new window.google.maps.Circle({
        //     strokeColor: '#1E90FF',
        //     strokeOpacity: 0.8,
        //     strokeWeight: 2,
        //     fillColor: '#1E90FF',
        //     fillOpacity: 0.35,
        //     map: map,
        //     center: {lat: 31.832876, lng: -116.597712},
        //     radius: 1000
        // });

         /**
          *
          * CODIGO PARA POSICIONAR EL MAPA EN UNAS COORDENADAS
          *
          */
        // var center = new window.google.maps.LatLng(nextProps.lat, nextProps.lng);
        // map.panTo(center);
        
        // let myoverlay = new window.google.maps.OverlayView();
        // myoverlay.draw = function () { this.getPanes().markerLayer.id='markerLayer'; };
        // myoverlay.setMap(map);

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

        // remove circles
        for(let i in circles) {
            let circulo = circles[i];
            circulo.setMap(null);
        }

        circles.length = 0;

        // paint circles
        console.log(nextProps.circulos);
        for(let i in nextProps.circulos) {

            let circulo = nextProps.circulos[i];

            console.log("pintando circulo", circulo);

            let fillColor = '#1E90FF';

            console.log('->', circulo);
            console.log('->', nextProps);

            if(circulo.lat == nextProps.lat && circulo.lng == nextProps.lng ) {
                fillColor = nextProps.color;
                console.log("estamos en el circulo");
            }

            let cityCircle = new window.google.maps.Circle({
                strokeColor: '#1E90FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: fillColor,
                fillOpacity: 1,
                map: map,
                center: circulo,
                radius: 1000
            });

            circles.push(cityCircle);

        }

    }

    render() {
        return (
            <div style={{ height: '600px', width: '100%' }}>
                <div style={{ height: '100%', width: '100%' }} id="map"></div>
            </div>
        )
    }

}


export default connect(
    null,
    actions,
)(Map)