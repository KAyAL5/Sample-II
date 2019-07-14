import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AppSettingsService } from '@app-services/shared/app-settings.service';
import { ToastService} from '@app-services/shared/app-toast.service';
import { AppMessageService, AuthService } from '@app-services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private config: AppSettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private toastSvc: ToastService,
    private messageSvc: AppMessageService) {
    // redirect to dashboard if already logged in
    if (this.authSvc.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.config.getAppConfig().subscribe(appConst => {
      this.config.setAppConst(appConst);

      this.submitted = true;
      this.loading = true;
      this.authSvc.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe (
          user => {
            if (user) {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate([this.returnUrl]);
            }
            this.loading = false;
          },
          error => {
            this.toastSvc.show({
              text: error,
              type: 'error',
            });
            // this.messageSvc.error(error);
            this.loading = false;
          });
    });
  }
}
