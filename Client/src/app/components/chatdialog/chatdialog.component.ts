import { Component, Inject, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatRadioChange } from '@angular/material';
import * as moment from 'moment';

import { ChatSocketService, AppGlobalService} from '@app-services/index';

@Component({
  selector: 'app-chatdialog',
  templateUrl: './chatdialog.component.html',
  styleUrls: ['./chatdialog.component.scss']
})
export class ChatdialogComponent implements OnDestroy {
  @ViewChild('divMessages') divMessages: ElementRef;

  user: string;
  message: string;
  messages: string[] = [];
  isTyping = false;
  subscription: any;

  onlineusers: any[]=[];

  constructor(
    private globalSvc: AppGlobalService,
    private chatsocketSvc: ChatSocketService,
    public dialogRef: MatDialogRef<ChatdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).firstName;
  }

  ngOnInit() {
    this.chatsocketSvc.getMessages().subscribe((message: string) => {
        this.messages.push(message);
        this.isTyping = false;
      });

      this.chatsocketSvc.receivedTyping().subscribe(bool => {
        this.isTyping = bool.isTyping;
      });

      this.subscription = this.globalSvc.stringVar$.subscribe(chatting =>{
        this.data.name=chatting;
      });
  }

  sendMessage(): void {
    // if (this.message.trim() !== '') {
    //   this.divMessages.nativeElement.insertAdjacentHTML('beforeend', '<p style="text-align: right">' + this.message + '</p>');
    //   this.message = '';
    // }

    const currentTime = moment().format('hh:mm:ss a');
    const messageWithTimestamp = `${currentTime}: ${this.user}: ${this.message}`;
    this.chatsocketSvc.sendMessage(messageWithTimestamp);
    this.message = '';
  }

  typing() {
      var chatwith={room:'',group:'', users:[]};
      //todo
     // this.chatsocketSvc.meTyping({typingfrom: chatwith, user: this.user});
  }
  
  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
