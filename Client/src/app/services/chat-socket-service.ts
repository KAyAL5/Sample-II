import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { AppSettingsService } from '@app-services/shared/app-settings.service';

@Injectable({ providedIn: 'root' })
export class ChatSocketService {

  appConst: string;
  private headers: HttpHeaders;
  private basetoken: any;
  private socket;

  constructor(private _http: HttpClient, private settingSev: AppSettingsService) {
    this.appConst = 'http://localhost:3000';
    this.socket = io(this.appConst);
    if(localStorage.getItem('currentUser')){
      this.basetoken = JSON.parse(localStorage.getItem('currentUser')).token;
    }
    
  }

  listeUser(): Observable<any> {
    const url = `${this.appConst}/chat/listeusers`;
    const datas = JSON.stringify({ token: this.basetoken });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  addmembre(newuser): Observable<any> {
    const url = `${this.appConst}/user/addmembre`;
    const datas = JSON.stringify({ token: this.basetoken, newuser: newuser });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message) => {
            observer.next(message);
        });
    });
  }

  // same as getMessage
  // public newMessageReceived = () => {
  //   const observable = new Observable<{ user: String, message: String}>(observer => {
  //     this.socket.on('new message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }

  typing(data) {
    this.socket.emit('typing', data);
  }

  // public receivedTyping = () => {
  //   return Observable.create((observer) => {
  //       this.socket.on('typing', (data) => {
  //           observer.next(data);
  //       });
  //   });
  // }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  public logout(data) {
    this.socket.emit('logout', data);
  }
}
