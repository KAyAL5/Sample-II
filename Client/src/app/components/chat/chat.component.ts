import {Component, OnInit, OnDestroy, Input} from '@angular/core';

import { AuthService, UserService, ChatService, RoomService, ChatGroupService } from '@app-services/index';
import { User, Room, IChatGroup } from '@app-interfaces/index';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public listeMessages: any = [];
  public messageAenvoye: String = '';
  public token: String = '';
  @Input() typechat: string;
  private keepSetInterval: any;
  private selectedFile: File;
  public rooms: any = [];
  public chatgroups: any = [];
  public users: any = [];

  public tchat_user: any;
  @Input() tchat_user_id: string;
  // CHAT GROUPE
  @Input() groupe_id: Number;
  public groupe: any;

  constructor(private authSvc: AuthService,
  private userSvc: UserService,
  private roomSvc: RoomService,
  private chatgroupSvc: ChatGroupService,
  private chatSvc: ChatService) { }

  ngOnInit() {
    this.authSvc.currentUser.subscribe(cu  => this.tchat_user = cu);
    this.tchat_user_id = this.tchat_user._id;

    this.roomSvc.getAll()
    .subscribe((res: string) => {
      this.rooms = res;
    });

    this.chatgroupSvc.getAll()
    .subscribe((res) =>{
      this.chatgroups = res;
    });

    this.userSvc.getAll()
    .subscribe((res) =>{
      this.users = res;
    });

    clearInterval(this.keepSetInterval);
    if (this.typechat === 'room') {
      this.ngOnInitroom();
    } else if (this.typechat === 'groupe') {
      this.ngOnInitgroupe();
    } else if (this.typechat === 'user') {
      this.ngOnInituser();
    }

    this.chatSvc
    .subscribedchatMessage()
    .subscribe((message: string) => {
      console.log(message)
    });
  }

  ngOnDestroy() {
    clearInterval(this.keepSetInterval);
    clearInterval(this.keepSetInterval);
    clearInterval(this.keepSetInterval);
  }

  // CHAT ROOM
  ngOnInitroom() {
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    this.listemessagesroom();
    this.keepSetInterval = setInterval(() => {
      this.listemessagesroom();
    }, 15000);
  }

  listemessagesroom() {
    this.chatSvc.listeMessagesRoom().subscribe(
      data => {
        if (data.errorCode) {
          console.log('ROOM');
          this.listeMessages = data.message;
        }
      },
      error => {
        console.log(error);
      },
      () => console.log('finished')
    );
  }

  envoiMessageroom() {
    clearInterval(this.keepSetInterval);
    this.chatSvc.envoiMessageRoom(this.messageAenvoye).subscribe(
      data => {
        if (data.errorCode) {
          this.listeMessages = data.message;
          this.messageAenvoye = '';
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.listemessagesroom();
        this.keepSetInterval = setInterval(() => {
          this.listemessagesroom();
        }, 15000);
      }
    );
  }

  handleFileInputroom(event) {
    clearInterval(this.keepSetInterval);
    if (event.target.files.length !== 0) {
      this.selectedFile = event.target.files[0];
      this.chatSvc.onUploadfile(this.selectedFile).subscribe(
        data => {
          if (data.errorCode) {
            this.chatSvc.envoiFileRoom(data.message).subscribe(
              datas => {
                console.log(datas);
                if (datas.errorCode) {
                  this.listeMessages = datas.message;
                } else {
                  console.log('error server');
                }
              },
              errors => {
                console.log(errors);
              },
              () => {
                this.listemessagesroom();
                this.keepSetInterval = setInterval(() => {
                  this.listemessagesroom();
                }, 15000);
              }
            );
          } else {
            console.log('erreur upload');
          }
        },
        error => {
          console.log(error);
        },
        () => console.log('test upload file')
      );
    } else {
      this.listemessagesroom();
      this.keepSetInterval = setInterval(() => {
        this.listemessagesroom();
      }, 15000);
    }
  }

  ngOnInitgroupe() {
    console.log('TCHAT GROUPE');
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    this.chatSvc.getGroupe(this.groupe_id).subscribe(
      data => {
        if (data.errorCode) {
          this.groupe = data.message.groupe;
          this.listeMessages = data.message.messages;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.listemessagesgroupe(this.groupe_id);
        this.keepSetInterval = setInterval(() => {
          console.log('GROUP ' + this.groupe_id);
          this.listemessagesgroupe(this.groupe_id);
        }, 15000);
      }
    );

  }

  listemessagesgroupe(groupe_id) {
    this.chatSvc.listeMessagesgroupe(groupe_id).subscribe(
      data => {
        console.log('GROUP');
        if (data.errorCode) {
          this.listeMessages = data.message;
        }
      },
      error => {
        console.log(error);
      },
      () => console.log('finished')
    );
  }

  envoiMessagegroupe() {
    clearInterval(this.keepSetInterval);
    this.chatSvc.envoiMessageGroupe(this.messageAenvoye, this.groupe.id).subscribe(
      data => {
        console.log(data);
        if (data.errorCode) {
          this.listeMessages = data.message;
          this.messageAenvoye = '';
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.listemessagesgroupe(this.groupe_id);
        this.keepSetInterval = setInterval(() => {
          this.listemessagesgroupe(this.groupe_id);
        }, 15000);
      }
    );
  }

  handleFileInputgroupe(event) {
    clearInterval(this.keepSetInterval);
    if (event.target.files.length !== 0) {
      this.selectedFile = event.target.files[0];
      this.chatSvc.onUploadfile(this.selectedFile).subscribe(
        data => {
          if (data.errorCode) {
            this.chatSvc.envoiFileGroupe(data.message, this.groupe_id).subscribe(
              datas => {
                console.log(datas);
                if (datas.errorCode) {
                  this.listeMessages = datas.message;
                } else {
                  console.log('error server');
                }
              },
              errors => {
                console.log(errors);
              },
              () => {
                this.listemessagesgroupe(this.groupe_id);
                this.keepSetInterval = setInterval(() => {
                  this.listemessagesgroupe(this.groupe_id);
                }, 15000);
              }
            );
          } else {
            console.log('erreur upload');
          }
        },
        error => {
          console.log(error);
        },
        () => console.log('test upload file')
      );
    } else {
      this.listemessagesgroupe(this.groupe_id);
      this.keepSetInterval = setInterval(() => {
        this.listemessagesgroupe(this.groupe_id);
      }, 15000);
    }
  }

// CHAT USER
  ngOnInituser() {
    this.chatSvc.getChatUser(this.tchat_user_id).subscribe(
      data => {
        if (data.errorCode) {
          this.tchat_user = data.message.user;
          this.listeMessages = data.message.messages;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.listemessagesuser(this.tchat_user_id);
        this.keepSetInterval = setInterval(() => {
          this.listemessagesuser(this.tchat_user_id);
        }, 15000);
      }
    );
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
  }

  listemessagesuser(tchat_user_id) {
    this.chatSvc.listeMessagesuser(tchat_user_id).subscribe(
      res => {
        console.log('USER');
        if (res) {
          this.listeMessages.push(res);
        }
      },
      error => {
        console.log(error);
      },
      () => console.log('finished')
    );
  }

  envoiMessageuser() {
    clearInterval(this.keepSetInterval);
    this.chatSvc.envoiMessageUser(this.messageAenvoye, this.tchat_user_id).subscribe(
      res => {
        if (res) {
          this.listeMessages.push(res);
          this.messageAenvoye = '';
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.listemessagesuser(this.tchat_user_id);
        this.keepSetInterval = setInterval(() => {
          this.listemessagesuser(this.tchat_user_id);
        }, 15000);
      }
    );
  }

  handleFileInputuser(event) {
    clearInterval(this.keepSetInterval);
    if (event.target.files.length !== 0) {
      this.selectedFile = event.target.files[0];
      this.chatSvc.onUploadfile(this.selectedFile).subscribe(
        data => {
          if (data.errorCode) {
            this.chatSvc.envoiFileUser(data.message, this.tchat_user_id).subscribe(
              datas => {
                console.log(datas);
                if (datas.errorCode) {
                  this.listeMessages = datas.message;
                } else {
                  console.log('error server');
                }
              },
              errors => {
                console.log(errors);
              },
              () => {
                this.listemessagesuser(this.tchat_user_id);
                this.keepSetInterval = setInterval(() => {
                  this.listemessagesuser(this.tchat_user_id);
                }, 15000);
              }
            );
          } else {
            console.log('erreur upload');
          }
        },
        error => {
          console.log(error);
        },
        () => console.log('test upload file')
      );
    } else {
      this.listemessagesuser(this.tchat_user_id);
      this.keepSetInterval = setInterval(() => {
        this.listemessagesuser(this.tchat_user_id);
      }, 15000);
    }
  }

  // sendMessage() {
  //   console.log('send message', this.msg);
  //   this.authSvc.despachMessage(this.msg)
  //   .subscribe (res => {
  //       if (!res) {
  //         console.log('res got: ', res);
  //       } else {
  //         console.log('res null: ', res);
  //       }
  //     },
  //     error => {
  //       this.AppmessageService.error(error.message);
  //     });
  // }

  feyaPublish(){
    this.chatSvc.publishchatMessage(this.messageAenvoye).subscribe(
      res => {
        console.log('Feay');
        if (res) {
          console.log(res);
        }
      },
      error => {
        console.log(error);
      },
      () => console.log('finished')
    );
  }
}
