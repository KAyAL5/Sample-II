import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { AuthService, UserService, ChatService, ChatRoomService, ChatGroupService } from '@app-services/index';

import { User, Room, IChatGroup } from '@app-interfaces/index';
import {IDropdown} from '@app-interfaces/IShared';

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
  public chatrooms: any = [];
  public chatgroups: any = [];
  onlineusers: any[]=[];
  public users: any = [];

  private tchat_user: any;
  @Input() tchat_user_id: string;

  // CHAT GROUP
  groupId: String;
  group: any;

  dropdowndata:IDropdown[];
  private selectedChatOn:string;
  selected="0";

  constructor(private authSvc: AuthService,
  private userSvc: UserService,
  private chatroomSvc: ChatRoomService,
  private chatgroupSvc: ChatGroupService,
  private chatSvc: ChatService) { }

  ngOnInit() {
    this.authSvc.currentUser.subscribe(cu  => this.tchat_user = cu);
    this.tchat_user_id = this.tchat_user._id;

    clearInterval(this.keepSetInterval);
    if (this.typechat === 'room') {
      this.ngOnInitroom();
    } else if (this.typechat === 'group') {
      this.ngOnInitgroup();
    } else if (this.typechat === 'user') {
      this.ngOnInituser();
    }

    this.chatSvc.subscribedchatMessage().subscribe((message: string) => {
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
    //this.room = this.chatrooms.find(x => x.id == this.roomId);
  }

  listemessagesroom() {
    this.chatSvc.listeMessagesRoom().subscribe(
      data => {
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

  ngOnInitgroup() {
    this.token = JSON.parse(localStorage.getItem('currentUser')).token;
    this.listemessagesgroup(this.groupId);
    this.group = this.chatgroups.find(x => x.id == this.groupId);
  }

  listemessagesgroup(groupId) {
    this.chatSvc.listeMessagesgroup(groupId).subscribe(
      data => {
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

  envoiMessagegroup() {
    clearInterval(this.keepSetInterval);
    this.chatSvc.envoiMessageGroup(this.messageAenvoye, this.group.id).subscribe(
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
        this.listemessagesgroup(this.groupId);
        this.keepSetInterval = setInterval(() => {
          this.listemessagesgroup(this.groupId);
        }, 15000);
      }
    );
  }

  handleFileInputgroup(event) {
    clearInterval(this.keepSetInterval);
    if (event.target.files.length !== 0) {
      this.selectedFile = event.target.files[0];
      this.chatSvc.onUploadfile(this.selectedFile).subscribe(
        data => {
          if (data.errorCode) {
            this.chatSvc.envoiFileGroup(data.message, this.groupId).subscribe(
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
                this.listemessagesgroup(this.groupId);
                this.keepSetInterval = setInterval(() => {
                  this.listemessagesgroup(this.groupId);
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
      this.listemessagesgroup(this.groupId);
      this.keepSetInterval = setInterval(() => {
        this.listemessagesgroup(this.groupId);
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

  optionChatChange($event: MatRadioChange){
    this.selected="0";
    switch (parseInt($event.value)) {
      case 1: //room
        if (this.chatrooms.length==0){
          this.chatroomSvc.getAll().subscribe(room => {
            this.chatrooms = room;
            this.dropdowndata = this.chatrooms.map(function(item) { return {key:item['id'], value:item['roomName']}; });
          });
        } else {
          this.dropdowndata = this.chatrooms.map(function(item) { return {key:item['id'], value:item['roomName']}; });
        }
        this.typechat = 'room';
        break;
      case 2: //group
        if (this.chatgroups.length==0){
          this.chatgroupSvc.getAll().subscribe(groups => {
            this.chatgroups=groups;
            this.dropdowndata = this.chatgroups.map(function(item) { return {key:item['id'], value:item['groupName']}; });
          });
        } else {
          this.dropdowndata = this.chatgroups.map(function(item) { return {key:item['id'], value:item['groupName']}; });
        }
        this.typechat = 'group';
        break;
      case 3: //private
          this.userSvc.getAll().subscribe(users => {
            this.onlineusers = users;
            this.dropdowndata = this.onlineusers.map(function(item) { return {key:item['id'], value:item['firstName']+ ' '+ item['lastName']}; });
          });
          this.typechat = 'user';
        break;
      default:
          console.log(`Case default option ${$event.source.name} : ${$event.value}`);
        break;
    }
  }

  selChatChange=($event: any)=>{
    switch (this.typechat) {
      case 'room':
        this.ngOnInitroom();
        break;
    case 'group':
        this.groupId=this.selected;
      this.ngOnInitgroup();
      break;
    case 'user':
      this.ngOnInituser();
      break;
      default:
        break;
    }
  }
}
