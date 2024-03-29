// This module is responsible for all of our Angular Material Components.
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule,
  MatProgressSpinnerModule, MatCardModule, MatDialogModule,
  MatTableModule, MatMenuModule, MatIconModule,
  MatDatepickerModule, MatSelectModule, MatNativeDateModule,
  MatListModule, MatSidenavModule, MatSnackBarModule, MatRadioModule, 
  MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatInputModule,
    MatProgressSpinnerModule, MatCardModule, MatDialogModule,
    MatTableModule, MatMenuModule, MatIconModule,
    MatDatepickerModule, MatSelectModule, MatNativeDateModule,
    MatListModule, MatSidenavModule, MatSnackBarModule, MatRadioModule,
    MatExpansionModule],
  exports: [CommonModule, MatButtonModule, MatToolbarModule, MatInputModule,
    MatProgressSpinnerModule, MatCardModule,
    MatDialogModule, MatTableModule, MatMenuModule, MatIconModule,
    MatDatepickerModule, MatSelectModule, MatNativeDateModule,
    MatListModule, MatSidenavModule, MatSnackBarModule, MatRadioModule,
    MatExpansionModule],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MaterialModule { }