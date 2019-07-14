import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppMessageService } from '@app-services/shared/app-message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any;

  constructor(private msgSvc:AppMessageService) { }

  ngOnInit() {
    this.subscription = this.msgSvc.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
