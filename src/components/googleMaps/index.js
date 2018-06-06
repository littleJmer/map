import React, { Component } from 'react'

import { GoogleStyles } from './styles';
// import mykml from './secciones.kml';
import mykml from './distritos.kml';
import seccion from './setsion.kml';
import haha from './icons/haha.png'

let map = null;

let myParser

const myIcon = [
  'https://i.imgur.com/wVAJS8Tr.png',
  'https://i.imgur.com/y7qZQS3r.png',
  'https://i.imgur.com/eq69HEzr.png',
  'https://i.imgur.com/XQSbgpwr.png',
  'https://i.imgur.com/JlQiyAur.png',
  'https://i.imgur.com/P4Xm6Dsr.png',
];

const randomPoints = [
{"Lat" : 31.87449754 ,"Lng": -116.60891811},
{"Lat" : 31.86896424 ,"Lng": -116.61539547},
{"Lat" : 31.87290443 ,"Lng": -116.60518492},
{"Lat" : 31.86680545 ,"Lng": -116.62030106},
{"Lat" : 31.87539893 ,"Lng": -116.60845317},
{"Lat" : 31.86723274 ,"Lng": -116.60351169},
{"Lat" : 31.86034939 ,"Lng": -116.61643365},
{"Lat" : 31.87542345 ,"Lng": -116.60952057},
{"Lat" : 31.86256052 ,"Lng": -116.61268088},
{"Lat" : 31.87051831 ,"Lng": -116.62249271},
{"Lat" : 31.87000055 ,"Lng": -116.62051651},
{"Lat" : 31.86815538 ,"Lng": -116.62122754},
{"Lat" : 31.86965223 ,"Lng": -116.61482355},
{"Lat" : 31.86708369 ,"Lng": -116.61535417},
{"Lat" : 31.87283137 ,"Lng": -116.60914484},
{"Lat" : 31.86595945 ,"Lng": -116.61129284},
{"Lat" : 31.86374828 ,"Lng": -116.6174797 },
{"Lat" : 31.87252963 ,"Lng": -116.6164342},
{"Lat" : 31.87014516 ,"Lng": -116.61326288},
{"Lat" : 31.86162726 ,"Lng": -116.61173716},
{"Lat" : 31.86926184 ,"Lng": -116.60674515},
{"Lat" : 31.87671816 ,"Lng": -116.61391047},
{"Lat" : 31.86642157 ,"Lng": -116.61958963},
{"Lat" : 31.87167706 ,"Lng": -116.6154562 },
{"Lat" : 31.87172192 ,"Lng": -116.61708335},
{"Lat" : 31.87269976 ,"Lng": -116.62018654},
{"Lat" : 31.86799008 ,"Lng": -116.62373475},
{"Lat" : 31.86063169 ,"Lng": -116.61227918},
{"Lat" : 31.87347621 ,"Lng": -116.60649563},
{"Lat" : 31.86380245 ,"Lng": -116.61744038},
{"Lat" : 31.86920232 ,"Lng": -116.6037972},
{"Lat" : 31.86011144 ,"Lng": -116.61005323},
{"Lat" : 31.86873429 ,"Lng": -116.61089778},
{"Lat" : 31.86728637 ,"Lng": -116.61229946},
{"Lat" : 31.85919207 ,"Lng": -116.61444508},
{"Lat" : 31.87263303 ,"Lng": -116.61811847},
{"Lat" : 31.8761875  ,"Lng": -116.61158111},
{"Lat" : 31.86580183 ,"Lng": -116.62407596},
{"Lat" : 31.86836724 ,"Lng": -116.61914152},
{"Lat" : 31.86342916 ,"Lng": -116.62088886},
{"Lat" : 31.86728977 ,"Lng": -116.61136849},
{"Lat" : 31.86521799 ,"Lng": -116.60798906},
{"Lat" : 31.8754951  ,"Lng": -116.61223055},
{"Lat" : 31.871149   ,"Lng": -116.6111032},
{"Lat" : 31.87326271 ,"Lng": -116.606125},
{"Lat" : 31.85937731 ,"Lng": -116.6150986},
{"Lat" : 31.86340639 ,"Lng": -116.60798068},
{"Lat" : 31.86763345 ,"Lng": -116.60870791},
{"Lat" : 31.8621543  ,"Lng": -116.6179479 },
{"Lat" : 31.86414642 ,"Lng": -116.62284351},
{"Lat" : 31.86664156 ,"Lng": -116.6157347},
{"Lat" : 31.86589905 ,"Lng": -116.60657989},
{"Lat" : 31.8692937  ,"Lng": -116.60854247},
{"Lat" : 31.86771542 ,"Lng": -116.61011935},
{"Lat" : 31.86798843 ,"Lng": -116.6109451},
{"Lat" : 31.87120999 ,"Lng": -116.61442198},
{"Lat" : 31.86658534 ,"Lng": -116.61234763},
{"Lat" : 31.86246143 ,"Lng": -116.61646198},
{"Lat" : 31.8622348  ,"Lng": -116.61439686},
{"Lat" : 31.8728991  ,"Lng": -116.6144649 },
{"Lat" : 31.86211274 ,"Lng": -116.61015663},
{"Lat" : 31.87041511 ,"Lng": -116.60767255},
{"Lat" : 31.8751906  ,"Lng": -116.61972955},
{"Lat" : 31.87456532 ,"Lng": -116.62107794},
{"Lat" : 31.87686025 ,"Lng": -116.61419424},
{"Lat" : 31.85933564 ,"Lng": -116.61313099},
{"Lat" : 31.86885083 ,"Lng": -116.61517834},
{"Lat" : 31.87157408 ,"Lng": -116.6213955},
{"Lat" : 31.87340088 ,"Lng": -116.60794592},
{"Lat" : 31.87559635 ,"Lng": -116.61644724},
{"Lat" : 31.86988911 ,"Lng": -116.60420052},
{"Lat" : 31.86728328 ,"Lng": -116.62398902},
{"Lat" : 31.86338882 ,"Lng": -116.60538297},
{"Lat" : 31.87434792 ,"Lng": -116.61757112},
{"Lat" : 31.8676187  ,"Lng": -116.6054780},
{"Lat" : 31.8677836  ,"Lng": -116.61378628},
{"Lat" : 31.87616091 ,"Lng": -116.6131190},
{"Lat" : 31.86529806 ,"Lng": -116.60640454},
{"Lat" : 31.86365502 ,"Lng": -116.61735865},
{"Lat" : 31.86694832 ,"Lng": -116.61859019},
{"Lat" : 31.87117157 ,"Lng": -116.61205825},
{"Lat" : 31.86414479 ,"Lng": -116.62260195},
{"Lat" : 31.86384481 ,"Lng": -116.62321306},
{"Lat" : 31.86618045 ,"Lng": -116.60918842},
{"Lat" : 31.86427048 ,"Lng": -116.60531328},
{"Lat" : 31.86283945 ,"Lng": -116.62064835},
{"Lat" : 31.86356014 ,"Lng": -116.60939518},
{"Lat" : 31.8702889  ,"Lng": -116.61104919},
{"Lat" : 31.86154807 ,"Lng": -116.61317211},
{"Lat" : 31.86305565 ,"Lng": -116.6198884 },
{"Lat" : 31.87551501 ,"Lng": -116.61567617},
{"Lat" : 31.86559794 ,"Lng": -116.62144846},
{"Lat" : 31.86287634 ,"Lng": -116.60918082},
{"Lat" : 31.87414728 ,"Lng": -116.61823847},
{"Lat" : 31.87196577 ,"Lng": -116.62022167},
{"Lat" : 31.86491454 ,"Lng": -116.61609801},
{"Lat" : 31.87357694 ,"Lng": -116.62037515},
{"Lat" : 31.87178233 ,"Lng": -116.61019211},
{"Lat" : 31.86445193 ,"Lng": -116.61698615},
{"Lat" : 31.86235028 ,"Lng": -116.61621726},
];

const catIcon = () => {
  let random = (Math.floor((Math.random() * 6) + 1)) - 1;
  return {
    url: myIcon[3],
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
            center: new window.google.maps.LatLng(32.653783, -115.464018),
            zoom: 13,
            mapTypeId: 'roadmap',
            styles: GoogleStyles,
        });

        // myParser = new window.geoXML3.parser({ map: map });
        // myParser.parse(seccion);
        // console.log("se armo");
        
        var image = {
            url: myIcon[2],
            size: new window.google.maps.Size(60, 60),
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(-15,0)
        }
        var image2 = 'https://i.imgur.com/wVAJS8Tr.png';


        for(let x=0 ; x<15 ; x++){
            let randompos = Math.floor(Math.random() * (100 - 1)) + 1;
            let latlng = new window.google.maps.LatLng( randomPoints[randompos]["Lat"] ,randomPoints[randompos]['Lng'] );
            var marker = new window.google.maps.Marker({
                position : latlng,
                map: map,
                title: 'Hello World!',
                icon : image
            });

            marker.setMap(map);
           
        }
        
        let myoverlay = new window.google.maps.OverlayView();

        myoverlay.draw = function () {
          // add an id to the layer that includes all the markers so you can use it in CSS
          this.getPanes().markerLayer.id='markerLayer';
        };
        myoverlay.setMap(map);



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
            var cityCircle = new window.google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                // fillColor: '#FF0000',
                // fillOpacity: .2,
                map: map,
                center: {lat: 31.855366, lng: -116.584063} ,
                radius: 1000
            });

            var cityCircle = new window.google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                // fillColor: '#FF0000',
                // fillOpacity: .2,
                map: map,
                center: {lat: 31.832876, lng: -116.597712},
                radius: 1000
            });

            var cityCircle = new window.google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                // fillColor: '#FF0000',
                // fillOpacity: .2,
                map: map,
                center: {lat:31.868061, lng: -116.613903},
                radius: 1000
            });

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