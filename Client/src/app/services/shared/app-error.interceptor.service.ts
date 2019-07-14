// By extending the HttpInterceptor class to create a custom interceptor
// and catch all error responses from the server in a single location.
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@app-services/auth/auth.service';
import { ToastService} from '@app-services/shared/app-toast.service';

@Injectable()
export class AppErrorInterceptorService implements HttpInterceptor {
    constructor(private authSvc: AuthService,
        private toastSvc: ToastService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.toastSvc.show({
                    text: err.message,
                    type: 'warning',
                  });
                this.authSvc.logout();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
