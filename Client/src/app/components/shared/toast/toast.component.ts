import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { ToastBackgroundColor } from '@app-constants/enums';

import { TOAST_CONFIG_TOKEN, ToastConfig } from '@app-interfaces/IToast';
import { ToastData, ToastRef } from '@app-classes/toast.class';
import { toastAnimations, ToastAnimationState } from '@app-constants/toast.constant';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['toast.component.scss'],
  animations: [toastAnimations.fadeToast],
})
export class ToastComponent implements OnInit, OnDestroy {
  animationState: ToastAnimationState = 'default';
  iconType: string;
  background: string;

  private intervalId: any;

  constructor(
    readonly data: ToastData,
    readonly ref: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig) {
      this.iconType = data.type === 'success' ? 'done' : data.type;
      this.background= ToastBackgroundColor[data.type];
  }

  ngOnInit() {
    this.intervalId = setTimeout(() => this.animationState = 'closing', 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  close() {
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}