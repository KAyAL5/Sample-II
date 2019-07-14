import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppGlobalService } from '@app-services/shared/app-global.service';

@Injectable()
export class AppSettingsService {

  constructor(private http: HttpClient, private appStore: AppGlobalService) {
    // this.getAppConfig().subscribe(data => {
    //   this.appUrls = data;
    // });
  }

  public getAppConfig(): Observable<any> {
    return this.http.get('./assets/config.json');
  }

  setAppConst(val) {
    const env = val.environments.filter(en => en.name === 'running');
    const apiUrl = val.environments.filter(en => en.name === env[0].api);
    this.appStore.api = apiUrl[0].api;
    this.appStore.hashKey = val.app.secret;
  }

  getAppConst() {
    return this.appStore;
  }

}
