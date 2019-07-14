import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';

import { ChatSocketService } from '@app-services/chat-socket-service';

@Component({
  selector: 'app-chatdialog',
  templateUrl: './chatdialog.component.html',
  styleUrls: ['./chatdialog.component.scss']
})
export class ChatdialogComponent {
  @ViewChild('divMessages') divMessages: ElementRef;

  user: string;
  message: string;
  messages: string[] = [];
  private chatroom ="Room-I";
  private isTyping = false;

  constructor(
    private chatsocketSev: ChatSocketService,
    public dialogRef: MatDialogRef<ChatdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).firstName;
  }

  ngOnInit() {
    this.chatsocketSev
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
        this.isTyping = false;
      });

      this.chatsocketSev.receivedTyping().subscribe(bool => {
        this.isTyping = bool.isTyping;
      });
  }

  sendMessage(): void {
    // if (this.message.trim() !== '') {
    //   this.divMessages.nativeElement.insertAdjacentHTML('beforeend', '<p style="text-align: right">' + this.message + '</p>');
    //   this.message = '';
    // }

    const currentTime = moment().format('hh:mm:ss a');
    const messageWithTimestamp = `${currentTime}: ${this.user}: ${this.message}`;
    this.chatsocketSev.sendMessage(messageWithTimestamp);
    this.message = '';
  }

  typing() {
    this.chatsocketSev.typing({room: this.chatroom, user: this.user});
  }
  
  close(): void {
    this.dialogRef.close();
  }

}
