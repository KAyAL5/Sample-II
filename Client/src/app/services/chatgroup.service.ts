import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppSettingsService } from '@app-services/shared/app-settings.service';

import { IChatGroup } from '@app-interfaces/IChatGroup';

@Injectable({ providedIn: 'root' })
export class ChatGroupService {
    appConst: any;
    constructor(private http: HttpClient, private appConstSvr: AppSettingsService) {
        // this.appConst = appConstSvr.getAppConst();
        this.appConst = 'http://localhost:3000';
    }

    getAll() {
        return this.http.get<any>(`${this.appConst}/chatgroup/groups`)
        .pipe(map(res => {
            if(res.status == true){
                return res.data;
            }
            return [];
        }));
    }

    getById(id: number) {
        return this.http.get(`${this.appConst.api}/chatgroup/${id}`);
    }

    add(chatgroup: IChatGroup) {
        return this.http.post(`${this.appConst.api}/chatgroup/add`, chatgroup);
    }

    update(chatgroup: IChatGroup) {
        return this.http.put(`${this.appConst.api}/chatgroup/${chatgroup.id}`, chatgroup);
    }

    delete(id: number) {
        return this.http.delete(`${this.appConst.api}/chatgroup/${id}`);
    }
}