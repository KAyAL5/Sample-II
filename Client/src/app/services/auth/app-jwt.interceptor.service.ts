// By extending the HttpInterceptor class to create a custom interceptor to modify http
// requests before they get sent to the server.
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '@app-services/auth/auth.service';

@Injectable()
export class AppJwtInterceptorService implements HttpInterceptor {
    constructor(private authSev: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authSev.currentUserValue;
        if (currentUser && currentUser.token) {
            const newRequest = request.clone({ headers: request.headers.set('Authorization', `Bearer ${currentUser.token}`) });
            // request = request.clone({
            //     setHeaders: {
            //         Authorization: `Bearer ${currentUser.token}`
            //     }
            // });
            console.log('headers:', request.headers);
            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }
        
    }
}
