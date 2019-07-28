import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppSettingsService, AppGlobalService, AuthService,
    ChatService, AppJwtInterceptorService, AppErrorInterceptorService,
    AppBlockUIInterceptorService, ChatSocketService, ChatRoomService,
   ChatGroupService, ErrorHandlerService } from '@app-services/index';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        AppSettingsService, AppGlobalService, AuthService,
        ChatService, AppJwtInterceptorService, AppErrorInterceptorService,
        AppBlockUIInterceptorService, ChatSocketService, ChatRoomService,
        ChatGroupService, ErrorHandlerService,
        { provide: HTTP_INTERCEPTORS, useClass: AppJwtInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AppErrorInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AppBlockUIInterceptorService,  multi: true }
    ]
})
export class ServicesModule { }