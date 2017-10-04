import { Injectable } from '@angular/core';
import { environment } from "../../environment/environment";
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';
import { SimpleMarker } from "../models";

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private jwtService: JwtService
  ) {}

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json'
      //'Accept': 'application/json',

  };

    //if (this.jwtService.getAccessToken()) {
    //  headersConfig['Authorization'] = `Token ${this.jwtService.getAccessToken()}`;
    //}
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res:Response) => {console.log(res.json().result); return(res.json());});
  }

  server_get(path: string): Observable<any> {
    return this.http.get(`${environment.server_url}${path}`, { headers: this.setHeaders()})
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  put(path: string, body: URLSearchParams): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      body,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res:Response) => {return res.json()});
  }

  post(path: string, body: URLSearchParams): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      body,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res:Response) => res.json());
  }


  // absolute get, bascially you determine the fqdn and optional cors
  abs_get(path: string, params: URLSearchParams = new URLSearchParams(), cors: boolean): Observable<any> {
    let headers = this.setHeaders();
    if (cors) headers.append("Access-Control-Allow-Origin", "*");
    return this.http.get(`${path}`, { headers: headers, search: params })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

}
