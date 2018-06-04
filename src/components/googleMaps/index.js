import React, { Component } from 'react'

import { GoogleStyles } from './styles';
// import mykml from './secciones.kml';
import mykml from './distritos.kml';

let map = null;

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

        let myParser = new window.geoXML3.parser({ map: map });
        myParser.parse(mykml);

    }

    render() {
        return (
            <div style={{ height: '500px', width: '100%' }}>
                <div style={{ height: '100%', width: '100%' }} id="map"></div>
            </div>
        )
    }

}