import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare var Faye: any;

import { AppSettingsService } from '@app-services/shared/app-settings.service';

@Injectable({ providedIn: 'root' })
export class ChatService {

  appConst: string;
  private headers: HttpHeaders;
  private basetoken: any;
  client: any;

  constructor(private _http: HttpClient, private settingSvc: AppSettingsService) {
    this.appConst = 'http://localhost:3000';
    // this.appConst = this.settingSvc.getAppConst();
    // this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.basetoken = JSON.parse(localStorage.getItem('currentUser')).token;
    this.client = new Faye.Client('http://localhost:3000/faye',{
      timeout: 20
    });

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

  listedatainitadmin(): Observable<any> {
    const url = `${this.appConst}/chat/listedatainitadmin`;
    const datas = JSON.stringify({ token: this.basetoken });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  listeMessagesRoom(): Observable<any> {
    const body = new HttpParams()
    .set('token', this.basetoken)
    .set('client_secret', 'client secret');
    return this._http.post(`${this.appConst}/chat/listemessagesroom`, body);
  }

  envoiMessageRoom(message): Observable<any> {
    const url = `${this.appConst}/chat/envoimessageroom`;
    const datas = JSON.stringify({ message: message, token: this.basetoken });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  envoiFileRoom(message: any): Observable<any> {
    const url = `${this.appConst}/chat/envoifileroom`;
    const datas = JSON.stringify({ message: message, token: this.basetoken });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  listeMessagesgroup(group_id): Observable<any> {
    const url = `${this.appConst}/chat/listemessagesgroup`;
    const datas = JSON.stringify({ token: this.basetoken, group_id: group_id });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  envoiMessageGroup(message, group_id): Observable<any> {
    const url = `${this.appConst}/chat/envoimessagegroup`;
    const datas = JSON.stringify({ message: message, token: this.basetoken, group_id: group_id });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  envoiFileGroup(message, group_id): Observable<any> {
    const url = `${this.appConst}/chat/envoifilegroup`;
    const datas = JSON.stringify({ message: message, token: this.basetoken, group_id: group_id });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  getChatUser(tchat_user_id): Observable<any> {
    const url = `${this.appConst}/chat/getuser`;
    const datas = JSON.stringify({ token: this.basetoken, tchat_user_id: tchat_user_id });
    const params = 'params=' + datas;
    return this._http.post(url, params);
  }

  listeMessagesuser(tchat_user_id: string) {
    return this._http.post<any>(`${this.appConst}/chat/listemessagesuser`, { token: this.basetoken, tchat_user_id: tchat_user_id })
        .pipe(map(msg => {
            return msg;
        }));
}

  envoiMessageUser(message, tchat_user_id): Observable<any> {
    return this._http.post<any>(`${this.appConst}/chat/envoimessageuser`, { message: message, token: this.basetoken, tchat_user_id: tchat_user_id })
    .pipe(map(msg => {
        return msg;
    }));
  }

  envoiFileUser(message, tchat_user_id): Observable<any> {
    const url = `${this.appConst}/chat/envoifileuser`;
    const datas = JSON.stringify({ message: message, token: this.basetoken, tchat_user_id: tchat_user_id });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  onUploadfile(selectedFile): Observable<any> {
    const url = `${this.appConst}/file/onUploadfile`;
    const uploadData = new FormData();
    uploadData.append('uploads', selectedFile, selectedFile.name);
    return this._http.post(url, uploadData);
  }

  getfile(file): Observable<any> {
    const url = `${this.appConst}/file/showfile`;
    const datas = JSON.stringify({ token: this.basetoken, file: file });
    const params = 'params=' + datas;
    return this._http.post(url, params, { headers: this.headers });
  }

  publishchatMessage(msg: String){
    return this._http.post<any>(`${this.appConst}/chat/message`, { token: this.basetoken, message: msg })
    .pipe(map(msg => {
        return msg;
    }));
  }

  subscribedchatMessage(){
    // return this._http.get<any>(`${this.appConst}/chat/channel`, {})
    // .pipe(map(msg => {
    //     return msg;
    // }));

    return Observable.create((observer) => {
    var subscription = this.client.subscribe('/channel', function(res) {
      console.log("Message:"+ res.message);
      console.log("Message:"+ res.token);
    })
    .then(function() {
      console.log('subscribe is active');
    });
  });
      // return Observable.create((observer) => {
      //     this.socket.on('new-message', (message) => {
      //         observer.next(message);
      //     });
      // });
  }
}
