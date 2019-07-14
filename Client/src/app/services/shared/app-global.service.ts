import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobalService {
  api: string[] = [];
  hashKey: string = null;
  IsloginedIn: boolean;
}
