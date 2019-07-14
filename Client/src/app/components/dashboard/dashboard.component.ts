import { Component, OnInit, HostListener} from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '@app-services/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
  users: any;
  constructor(private userSvc: UserService) {
  }

  ngOnInit() {
  }

  submit() {
    this.userSvc.getAll().subscribe(users => {
      // console.log(users);
      this.users = users;
    });
  }

}
