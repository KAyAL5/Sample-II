import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppSettingsService } from '@app-services/shared/app-settings.service';

import { User } from '@app-interfaces/IUser';

@Injectable({ providedIn: 'root' })
export class UserService {
    appConst: any;
    constructor(private http: HttpClient, private appConstSvr: AppSettingsService) {
        // this.appConst = appConstSvr.getAppConst();
        this.appConst = 'http://localhost:3000';
    }

    getAll() {
        return this.http.get<any>(`${this.appConst}/user/users`)
        .pipe(map(res => {
            if(res.status == true){
                return res.data;
            }
            return [];
        }));
    }

    getById(id: number) {
        return this.http.get(`${this.appConst.api}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.appConst.api}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${this.appConst.api}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.appConst.api}/users/${id}`);
    }
}