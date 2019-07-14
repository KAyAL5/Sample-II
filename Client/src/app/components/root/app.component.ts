import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

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
  
  constructor(private router: Router,
    private authSev: AuthService,
    private dialog: MatDialog) {
    this.authSev.currentUser.subscribe(cu => this.currentUser = cu);
  }

  ngOnInit() {
    // localStorage.debug = 'socket.io-client:socket';
  }

  logout() {
    this.authSev.logout();
    this.router.navigate(['/login']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChatdialogComponent, {
      width: '250px',
      data: { name: ' drag me' },
      hasBackdrop:false,
      disableClose: true,
      position: { right: '0', bottom: '0'},
      autoFocus:true,
      height: '300'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
