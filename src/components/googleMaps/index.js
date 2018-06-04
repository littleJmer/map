import React, { Component } from 'react'

import { GoogleStyles } from './styles';
import TestImage from './distrito.svg';

// const myIcon = [
//   'https://i.imgur.com/wVAJS8Tr.png',
//   'https://i.imgur.com/y7qZQS3r.png',
//   'https://i.imgur.com/eq69HEzr.png',
//   'https://i.imgur.com/XQSbgpwr.png',
//   'https://i.imgur.com/JlQiyAur.png',
//   'https://i.imgur.com/P4Xm6Dsr.png',
// ];

var catIcon = {
  url: 'https://i.imgur.com/wVAJS8Tr.png',
  size: new window.google.maps.Size(70, 60),
  scaledSize: new window.google.maps.Size(70, 60),
  origin: new window.google.maps.Point(0,0)
};

let map, markers = [], marker1, marker2;

// This example creates a custom overlay called USGSOverlay, containing
// a U.S. Geological Survey (USGS) image of the relevant area on the map.

// Set the custom overlay object's prototype to a new instance
// of OverlayView. In effect, this will subclass the overlay class therefore
// it's simpler to load the API synchronously, using
// google.maps.event.addDomListener().
// Note that we set the prototype to an instance, rather than the
// parent class itself, because we do not wish to modify the parent class.

let overlay;

USGSOverlay.prototype = new window.google.maps.OverlayView();

/** @constructor */
function USGSOverlay(bounds, image, map) {

    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);

}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);

};

USGSOverlay.prototype.draw = function() {

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};

export default class Map extends Component {

  constructor(props) {

    super(props)

    this.state = {

        lat1: 27.92953,
        lng1: -132.190977,

        lat2: 31.692982,
        lng2: -98.82678,
    }

    this._handleInputChange = this._handleInputChange.bind(this);

  }

  componentDidMount() {

    map = new window.google.maps.Map(document.getElementById('map'), {
      center: new window.google.maps.LatLng(31.8724908, -116.5991291,13),
      zoom: 13,
      mapTypeId: 'roadmap',
      styles: GoogleStyles,
    });

    this._renderOverlay();
    
    /*
    //If you want to do this without wobble animation no need for hacky fix
    var catIcon = {
      url: myIcon,
      size: new google.maps.Size(70, 60),
      scaledSize: new google.maps.Size(70, 60),
      origin: new google.maps.Point(0,0)
    }*/

    // for (var i = RandomPoints.length - 1; i >= 0; i--) {

    //   let random = RandomPoints[i];

    // let latLng = new window.google.maps.LatLng(random.Lat, random.Lng);
    // let marker = new window.google.maps.Marker({
    //   position:latLng,
    //   map: this.map,
    //   // set the icon as catIcon declared above
    //   icon: catIcon,
    //   // must use optimized false for CSS
    //   optimized: false,
    //   title: ':p'
    // });

    // }

    // primero generamos al random cuantas acciones
    // let randomActions = Math.floor((Math.random() * 20) + 10);

    // for (let i = randomActions - 1; i >= 0; i--) {
      
    //   let RandomPoint = (Math.floor((Math.random() * 20) + 1)) - 1;
    //   let duration = (Math.floor((Math.random() * 7) + 3));

    //   markers.push({
    //     ...RandomPoints[RandomPoint],
    //     duration: duration,
    //     obj: null,
    //   });

    // }

    // pintamos las acciones
    // for (let i = markers.length - 1; i >= 0; i--) {

    //   let tmp = markers[i];

    //   tmp.duration -= 1;

    //   let latLng = new window.google.maps.LatLng(tmp.Lat, tmp.Lng);

    //   tmp.obj = new window.google.maps.Marker({
    //     position:latLng,
    //     map: map,
    //     // set the icon as catIcon declared above
    //     icon: catIcon(),
    //     // must use optimized false for CSS
    //     optimized: false,
    //     title: ':p'
    //   });

    // }

    // animations
    // let loop = function() {
    //   setTimeout(() => {

    
    //     for (var i = markers.length - 1; i >= 0; i--) {
    //       let tmp = markers[i];

    //       tmp.duration -= 1;

    //       if(tmp.duration < 0) {
    //         markers[i].obj.setMap(null);
    //         markers.splice(i, 1);

    //         // add new actions
    //         let RandomPoint = (Math.floor((Math.random() * 20) + 1)) - 1;
    //         let duration = (Math.floor((Math.random() * 7) + 3));
    //         let latLng = new window.google.maps.LatLng(RandomPoints[RandomPoint].Lat, RandomPoints[RandomPoint].Lng);

    //         markers.push({
    //           ...RandomPoints[RandomPoint],
    //           duration: duration,
    //           obj: new window.google.maps.Marker({
    //             position:latLng,
    //             map: map,
    //             // set the icon as catIcon declared above
    //             icon: catIcon(),
    //             // must use optimized false for CSS
    //             optimized: false,
    //             title: ':p'
    //           }),
    //         });
    //         //

    //       }

    //     }


    //     loop();
    //   }, 1000*4);
    // };


    // loop();

    
    // Overlay view allows you to organize your markers in the DOM
    // https://developers.google.com/maps/documentation/javascript/reference#OverlayView
    // let myoverlay = new window.google.maps.OverlayView();

    // myoverlay.draw = function () {
    //   // add an id to the layer that includes all the markers so you can use it in CSS
    //   this.getPanes().markerLayer.id='markerLayer';
    // };

    // myoverlay.setMap(map);


  }


  _handleInputChange(event) {


    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this._renderOverlay();

  }

  _renderOverlay() {


    var self = this;

    if(typeof overlay === 'object') {
        // remove

        overlay.setMap(null);

        marker1.setMap(null);
        marker2.setMap(null);

    }


    let latLng = new window.google.maps.LatLng(self.state.lat1, self.state.lng1);
    marker1 = new window.google.maps.Marker({
        position:latLng,
        map: map,
        // set the icon as catIcon declared above
        icon: catIcon,
        // must use optimized false for CSS
        optimized: false,
        title: ':p'
      });


    latLng = new window.google.maps.LatLng(self.state.lat2, self.state.lng2);
    marker2 = new window.google.maps.Marker({
        position:latLng,
        map: map,
        // set the icon as catIcon declared above
        icon: catIcon,
        // must use optimized false for CSS
        optimized: false,
        title: ':p'
      });


    var bounds = new window.google.maps.LatLngBounds(
        // 27.929530, -120.190977
        new window.google.maps.LatLng(self.state.lat1, self.state.lng1), //eii
        // 32.579596, -113.772922
        new window.google.maps.LatLng(self.state.lat2, self.state.lng2) // esud
    );

    // The photograph is courtesy of the U.S. Geological Survey.
    // var srcImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/talkeetna.png';
    // var srcImage = './test.png';

    // The custom USGSOverlay object contains the USGS image,
    // the bounds of the image, and a reference to the map.
    overlay = new USGSOverlay(bounds, TestImage, map);

  }

  render() {
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <div style={{ height: '100%', width: '100%' }} id="map"></div>
        <input type="number" step=".01" name="lat1" onChange={this._handleInputChange} value={this.state.lat1} />
        <input type="number" step=".01" name="lng1" onChange={this._handleInputChange} value={this.state.lng1} />
        <input type="number" step=".01" name="lat2" onChange={this._handleInputChange} value={this.state.lat2} />
        <input type="number" step=".01" name="lng2" onChange={this._handleInputChange} value={this.state.lng2} />
      </div>
      )
  }

}