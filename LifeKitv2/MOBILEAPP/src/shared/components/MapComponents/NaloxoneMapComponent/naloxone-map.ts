import { Component, ViewChild, ElementRef } from "@angular/core";
import { Platform } from "ionic-angular";
import { DeviceService } from "../../shared";
import { Geoposition, Geolocation } from "ionic-native";
import { SimpleMarker } from "../../shared/models";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {GooglePlaces} from "../../../services/googleplaces.service";

@Component({
  templateUrl: 'naloxone-map.html',
  selector: 'Naloxone-Map'
})
export class NaloxoneMap {


  constructor(public googlePlaces:GooglePlaces,public geo: Geolocation, public googleMaps: GoogleMaps) {

  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      map.setMyLocationEnabled(true);
      Geolocation.getCurrentPosition().then(res=>{
        // create LatLng object
        let currentLocation:LatLng = new LatLng(res.coords.latitude,res.coords.longitude);
        // create CameraPosition
        let position: CameraPosition = {
          target: currentLocation,
          zoom: 18
        };
        // move the map's camera to position
        map.moveCamera(position);

        this.googlePlaces.getGooglePlaces('pharmacy',res,15000,15).subscribe(places=>{
          console.log(places);
          places.forEach(p=>{
            let coord:LatLng = new LatLng(p.geometry.location.lat,p.geometry.location.lng);
            let markerOptions: MarkerOptions = {
              position: coord,
              icon: "https://www.google.com/intl/en_us/mapfiles/ms/icons/pharmacy-us.png"
            };
            map.addMarker(markerOptions);
          });
        });
      });
    });


  }



}
