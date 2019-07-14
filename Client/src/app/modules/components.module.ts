import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app-modules/material.module';

import {
    LoginComponent, DashboardComponent,
    ChatComponent,
    RegistrationComponent} from '@app-components/index';
import { from } from 'rxjs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [
        DashboardComponent,
        RegistrationComponent,
        LoginComponent,
        ChatComponent
    ],
    providers: [ ]
})
export class ComponentsModule { }