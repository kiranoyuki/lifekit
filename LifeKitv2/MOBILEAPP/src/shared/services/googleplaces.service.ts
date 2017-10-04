import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {SimpleMarker} from "../models/marker.model";
import {URLSearchParams} from "@angular/http";
import {DeviceService} from "./device.service";
import {ApiService} from "./api.service";
import {Observable, ReplaySubject} from "rxjs";
import {Geoposition} from "ionic-native";
import {GooglePlace} from "../models/GooglePlace";
/**
 * Created by roy_f on 3/16/2017.
 */

@Injectable()
export class GooglePlaces{
  public static HTTP_REQUEST = environment.maps_api_url;
  public static API_KEY = environment.maps_api_key;

  constructor(public apiService:ApiService){

  }

  public getGooglePlaces(aPlace:string, userLocation: Geoposition, radius: number, numResults: number ):Observable<GooglePlace[]> {
    let example = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDJ2gtLk2bgMvCwqBDWHJGilstJuKE87-Y";
    let url = `https://maps.googleapis.com/maps/api/place/radarsearch/json`;
    let searchParams = new URLSearchParams();
    searchParams.append('opennow',"true");
    searchParams.append('rankby','distance');
    searchParams.append('radius',radius + "");
    searchParams.append('keyword',aPlace);
    searchParams.append("type",aPlace);
    searchParams.append("location", userLocation.coords.latitude + "," + userLocation.coords.longitude);
    searchParams.append("key", environment.maps_api_key);
    var getGoogleDetailed = this.getGoogleDetailed;
    var abs_get = this.apiService.abs_get;
    var ob:Observable<GooglePlace[]> = new Observable<GooglePlace[]>(observer=>{
      this.apiService.abs_get(url,searchParams,false).subscribe(res=>{
          var places:GooglePlace[] = [];
          var array:any[] = res.results;
          var i =0;
          this.getGoogleDetailedHelper(i,places,array,numResults,observer);
        }
      ,error=>{console.log(error)});
    });
    return(ob);
  }

  public getGoogleDetailedHelper(i,places, array,numResults,observer){
    this.getGoogleDetailed(array[i].place_id + "").subscribe(res => {
      places.push(res);
      if(places.length==numResults){
        observer.next(places);
      }else{
        i++;
        this.getGoogleDetailedHelper(i,places,array,numResults,observer);
      }
    });
  }

  public getGoogleDetailed(placeId:string):Observable<GooglePlace>{
    let url = 'https://maps.googleapis.com/maps/api/place/details/json';
    let searchParams = new URLSearchParams();
    searchParams.append('placeid',placeId);
    searchParams.append('key',environment.maps_api_key);
    return(this.apiService.abs_get(url,searchParams,false).map(res=>{
      return(res.result);
    }));
  }
}
