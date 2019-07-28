import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { ChatRoomService, ChatGroupService, AppGlobalService } from '@app-services/index';
import { ChatdialogComponent } from '@app-components/chatdialog/chatdialog.component';

import { AuthService } from '@app-services/auth/auth.service';

import { User } from '@app-interfaces/IUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
  chatrooms:any[]=[];
  chatgroups:any[]=[];
  onlineusers: any[]=[];

  dialogRef: MatDialogRef<ChatdialogComponent>;
  
  constructor(private router: Router,
    private authSvc: AuthService,
    private globalSvc: AppGlobalService,
    private roomSvc: ChatRoomService,
    private groupSvc:ChatGroupService,
    private dialog: MatDialog) {
    this.authSvc.currentUser.subscribe(cu => this.currentUser = cu);
  }

  ngOnInit() {
    // localStorage.debug = 'socket.io-client:socket';
    this.roomSvc.getAll().subscribe(rooms => {
      this.chatrooms = rooms;
    });
    this.groupSvc.getAll().subscribe(groups => {
      this.chatgroups=groups;
    });
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

  selectChatTo(chatto){
    this.openDialog();
    this.globalSvc.updateStringSubject(chatto);
  }

  openDialog(): void {
    if (this.dialogRef!=undefined) return;
    this.dialogRef = this.dialog.open(ChatdialogComponent, {
      width: '300px',
      data: { name: '' },
      hasBackdrop:false,
      disableClose: true,
      position: { right: '0', bottom: '0'},
      autoFocus:true,
      height: '300'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
