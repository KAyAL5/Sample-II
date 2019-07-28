import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ToastService } from '@app-services/shared/app-toast.service';

@Injectable()
export class ErrorHandlerService implements ErrorHandler 
{
    constructor(private injector: Injector,
                private toastSvc: ToastService) { }

    handleError(error) 
    {
        debugger;
        this.toastSvc.show({
            text: error.message,
            type: 'error',
          });
        throw error;
   }
}