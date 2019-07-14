import { InjectionToken } from '@angular/core';

export interface ToastConfig {
    position?: {
        top: number;
        right: number;
    };
    animation?: {
        fadeOut: number;
        fadeIn: number;
    };
}

 export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');