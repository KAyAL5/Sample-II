import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AppGlobalService {
  api: string[] = [];
  hashKey: string = null;
  IsloginedIn: boolean;

  // Create a subject - The thing that will be watched by the observable
  public stringVar = new Subject<string>();
  // Create an observable to watch the subject and send out a stream of updates 
  //(we will subscribe to this to get the update stream)
  public stringVar$ = this.stringVar.asObservable(); //Has a $ 

  // Create a method that allows you to update the subject being watched by observable
  public updateStringSubject(newStringVar: string) {
    this.stringVar.next(newStringVar);
  }
}
