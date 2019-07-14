import { Component, OnInit } from '@angular/core';
// import { Routes,  } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '@app-services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private registrationForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private authSvc: AuthService,
    ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get frm() { return this.registrationForm.controls; }

}
