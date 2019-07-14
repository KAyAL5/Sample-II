import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, ServicesModule, ToastModule } from '@app-modules/index';
import { MaterialModule } from '@app-modules/material.module';

import { ComponentsModule} from '@app-modules/index';
import { AppComponent, BlockUIComponent } from '@app-components/index';
import { MessageComponent } from '@app-components/shared/message/message.component';

import { DialogDraggableDirective } from '@app-directives/dialog-draggable.directive';
import { ChatdialogComponent } from '@app-components/chatdialog/chatdialog.component';
import { ModalPositionCache } from '@app-services/shared/app-dialogPositionCache.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ServicesModule,
    ComponentsModule,
    MaterialModule,
    ToastModule.forRoot()
  ],
  declarations: [AppComponent, MessageComponent, BlockUIComponent, ChatdialogComponent, DialogDraggableDirective],
  entryComponents: [ChatdialogComponent],
  providers: [ModalPositionCache],
  bootstrap: [AppComponent]
})
export class AppModule { }
