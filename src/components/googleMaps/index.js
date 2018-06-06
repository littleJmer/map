import React, { Component } from 'react'

import { GoogleStyles } from './styles';
import secretarias from './Secretarias.kml';

import './index.css';

let map = null,
    myParser,
    markers = [];

const myIcon = [
    'https://i.imgur.com/wVAJS8Tr.png',
    'https://i.imgur.com/y7qZQS3r.png',
    'https://i.imgur.com/eq69HEzr.png',
    'https://i.imgur.com/XQSbgpwr.png',
    'https://i.imgur.com/JlQiyAur.png',
    'https://i.imgur.com/P4Xm6Dsr.png',
];

const catIcon = () => {
    let random = (Math.floor((Math.random() * 6) + 1)) - 1;
    return {
        url: myIcon[random],
        size: new window.google.maps.Size(60, 60),
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(-15,0)
    }
}

const RandomPoints = [
    { 'Lat': 31.8635813, 'Lng': -116.5751466},
    { 'Lat': 32.6260154, 'Lng': -115.4800766},
    { 'Lat': 31.8088069, 'Lng': -116.5951735},
    { 'Lat': 31.8561914, 'Lng': -116.6083736},
    { 'Lat': 31.8496673, 'Lng': -116.6146718},
    { 'Lat': 31.8102728, 'Lng': -116.594897},
    { 'Lat': 32.5303629, 'Lng': -117.0261716},
    { 'Lat': 32.6412099, 'Lng': -115.4756691},
    { 'Lat': 31.858482, 'Lng': -116.6193447},
    { 'Lat': 32.6439238, 'Lng': -115.4509082},
    { 'Lat': 32.6412099, 'Lng': -115.4756691},
    { 'Lat': 32.52929, 'Lng': -117.0370433},
    { 'Lat': 32.665393, 'Lng': -115.486977},
    { 'Lat': 31.8695708, 'Lng': -116.6113906},
    { 'Lat': 32.6293398, 'Lng': -115.4454418},
    { 'Lat': 32.5424067, 'Lng': -116.9940261},
    { 'Lat': 31.8588159, 'Lng': -116.6148151},
    { 'Lat': 31.8078042, 'Lng': -116.5941402},
    { 'Lat': 32.635003, 'Lng': -115.475213},
    { 'Lat': 32.6158015, 'Lng': -115.4347372},
    { 'Lat': 32.4915475, 'Lng': -116.8881797},
    { 'Lat': 32.631621, 'Lng': -115.4793085},
    { 'Lat': 32.638498, 'Lng': -115.473752},
    { 'Lat': 32.4490802, 'Lng': -116.9092522},
    { 'Lat': 32.6408593, 'Lng': -115.4815454},
    { 'Lat': 31.8149885, 'Lng': -116.5950189},
    { 'Lat': 31.8080637, 'Lng': -116.595542},
    { 'Lat': 32.5355843, 'Lng': -117.0373153},
    { 'Lat': 32.5195002, 'Lng': -117.0111475},
    { 'Lat': 31.8562175, 'Lng': -116.6179883},
    { 'Lat': 32.5208585, 'Lng': -117.0364459},
];

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
        myParser.parse(secretarias).then(() => { });


        // primero generamos al random cuantas acciones
        let randomActions = Math.floor((Math.random() * 20) + 10);

        // hacemos fill a los markers
        for (let i = randomActions - 1; i >= 0; i--) {

            let RandomPoint = (Math.floor((Math.random() * 30) + 1)) - 1;
            let duration = (Math.floor((Math.random() * 7) + 3));

            markers.push({
                ...RandomPoints[RandomPoint],
                duration: duration,
                obj: null,
            });

        }

        // pintamos las acciones
        for (let i = markers.length - 1; i >= 0; i--) {

            let tmp = markers[i];

            tmp.duration -= 1;

            let latLng = new window.google.maps.LatLng(tmp.Lat, tmp.Lng);

            tmp.obj = new window.google.maps.Marker({
                position:latLng,
                map: map,
                // set the icon as catIcon declared above
                icon: catIcon(),
                // must use optimized false for CSS
                animation: window.google.maps.Animation.DROP,
                title: ''
            });

            tmp.obj.setAnimation(window.google.maps.Animation.BOUNCE);
        }




        let loop = function() {
            setTimeout(() => {


            for (var i = markers.length - 1; i >= 0; i--) {
                let tmp = markers[i];

                tmp.duration -= 1;

                if(tmp.duration < 0) {

                    markers[i].obj.setMap(null);
                    markers.splice(i, 1);

                    // add new actions
                    let RandomPoint = (Math.floor((Math.random() * 20) + 1)) - 1;
                    let duration = (Math.floor((Math.random() * 7) + 3));

                    let latLng = new window.google.maps.LatLng(RandomPoints[RandomPoint].Lat, RandomPoints[RandomPoint].Lng);

                    markers.push({
                        ...RandomPoints[RandomPoint],
                        duration: duration,
                        obj: new window.google.maps.Marker({
                            position:latLng,
                            map: map,
                            // set the icon as catIcon declared above
                            icon: catIcon(),
                            // must use optimized false for CSS
                            animation: window.google.maps.Animation.BOUNCE,
                            optimized: false,
                            title: '',
                        }),
                    });

                    // setTimeout(() => {
                    //     markers[ markers.length-1 ].setAnimation(window.google.maps.Animation.BOUNCE);
                    // }, 200);

                //

                }

            }


            loop();
            }, 1000*4);
        };


        loop();


        // Overlay view allows you to organize your markers in the DOM
        // https://developers.google.com/maps/documentation/javascript/reference#OverlayView
        let myoverlay = new window.google.maps.OverlayView();

        myoverlay.draw = function () {
          // add an id to the layer that includes all the markers so you can use it in CSS
          this.getPanes().markerLayer.id='markerLayer';
        };

        myoverlay.setMap(map);




        map.addListener('center_changed', function() {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            window.setTimeout(function() {
              map.panTo(marker.getPosition());
            }, 3000);
        })


    }


    render() {
        return (
            <div style={{ height: '500px', width: '100%' }}>
                <div style={{ height: '100%', width: '100%' }} id="map"></div>
            </div>
        )
    }

}