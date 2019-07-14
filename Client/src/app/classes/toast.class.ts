import { OverlayRef } from '@angular/cdk/overlay';
import { TemplateRef } from '@angular/core';

import { ToastType } from 'src/app/constants/types';

export class ToastRef {
  constructor(private readonly overlay: OverlayRef) { }

  close() {
    this.overlay.dispose();
  }

  isVisible() {
    return this.overlay && this.overlay.overlayElement;
  }

  getPosition() {
    return this.overlay.overlayElement.getBoundingClientRect()
  }
}

export class ToastData {
    type: ToastType;
    text?: string;
    template?: TemplateRef<any>;
    templateContext?: {};
  }