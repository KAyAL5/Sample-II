import { NgModule, ModuleWithProviders } from '@angular/core'
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';

import { ToastComponent } from '@app-components/shared/toast/toast.component';
import { TOAST_CONFIG_TOKEN } from '@app-interfaces/IToast';
import { defaultToastConfig } from '@app-constants/toast.constant';

@NgModule({
  imports: [OverlayModule, MatIconModule],
  declarations: [ToastComponent],
  entryComponents: [ToastComponent]
})
export class ToastModule {
  public static forRoot(config = defaultToastConfig): ModuleWithProviders {
        return {
            ngModule: ToastModule,
            providers: [
                {
                    provide: TOAST_CONFIG_TOKEN,
                    useValue: { ...defaultToastConfig, ...config },
                },
            ],
        };
    }
 }