import { AnimationTriggerMetadata, trigger, state, transition, style, animate} from '@angular/animations';
import { ToastConfig } from '@app-interfaces/IToast'

export const toastAnimations: { readonly fadeToast: AnimationTriggerMetadata; } = {
    fadeToast: trigger('fadeAnimation', [
        state('default', style({ opacity: 1})),
        transition('void => *', [style({ opacity: 0 }), animate('{{ fadeIn }}ms')]),
        transition( 'default => closing', animate('{{ fadeOut }}ms', style({ opacity: 0})),
        ),
    ]),
};

export const defaultToastConfig: ToastConfig = {
    position: {
        top: 20,
        right: 20,
    },
    animation: {
        fadeOut: 2500,
        fadeIn: 300,
    },
};

export type ToastAnimationState = 'default' | 'closing';