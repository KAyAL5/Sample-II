import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettingsService } from '@app-services/shared/app-settings.service';

import { Room } from '@app-interfaces/IRoom';

@Injectable({ providedIn: 'root' })
export class ChatRoomService {
    appConst: any;

    constructor(private http: HttpClient, private appConstSvr: AppSettingsService) {
        //this.appConst = appConstSvr.getAppConst();
        this.appConst = 'http://localhost:3000';
    }

    getAll() {
        // let headers = new HttpHeaders();
        // headers = headers.append('Accept', 'application/json');
        // headers = headers.append('Content-Type', 'application/json');

        // return this.http.get<Room[]>(`${this.appConst.api}/room/rooms`);

        return this.http.get<any>(`${this.appConst}/room/rooms`)
        .pipe(map(res => {
            if(res.status == true){
                return res.data;
            }
            return [];
        }));
    }

    getById(id: number) {
        return this.http.get(`${this.appConst.api}/room/${id}`);
    }

    add(room: Room) {
        return this.http.post(`${this.appConst.api}/room/add`, room);
    }

    update(room: Room) {
        return this.http.put(`${this.appConst.api}/room/${room.id}`, room);
    }

    delete(id: number) {
        return this.http.delete(`${this.appConst.api}/room/${id}`);
    }
}