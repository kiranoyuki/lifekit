import {Component, ViewChild, ElementRef, Input} from "@angular/core";
import { Geoposition, Geolocation } from "ionic-native";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {EmergencyService} from "../../../services/emergency.service";
import {Observable} from "rxjs";
import {App} from "ionic-angular";

@Component({
  templateUrl: 'responders-map.html',
  selector: 'Responders-Map'
})
export class RespondersMap {

  @Input() emergencyId:number;
  public obUpdateResponders = null;
  public responderMarkers = [];
  constructor(public app: App,public es:EmergencyService,public geo: Geolocation, public googleMaps: GoogleMaps) {

  }
  ngOnDestroy(){
    if(this.obUpdateResponders){
      this.obUpdateResponders.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.loadMap().then((map)=>{
      //add the markers and then start an interval to check for movement of responders
      let ob = Observable.timer(0,4000);
      this.obUpdateResponders = ob.subscribe(res=>{
        this.updateResponderMarkers(map);
      });
    });
  }

  updateResponderMarkers(map:GoogleMap):Promise<any>{
    let promise = new Promise((resolve,reject)=>{
      this.es.getEmergencyStatus(this.emergencyId).subscribe(respondersList=>{
        map.clear();

        respondersList.forEach(responder=>{
          let latlng = new LatLng(responder.last_lat,responder.last_lng);
          let marker:MarkerOptions={
            position: latlng,
            icon: "https://www.google.com/intl/en_us/mapfiles/ms/icons/hospitals.png"
          };
          this.responderMarkers.push(map.addMarker(marker));
        });
        resolve();
      });
    });
    return(promise);
  }

  loadMap():Promise<GoogleMap> {
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
    let promise = new Promise((resolve,reject)=>{
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
          resolve(map);
        });
      });
    });
    return(promise);
  }



}
