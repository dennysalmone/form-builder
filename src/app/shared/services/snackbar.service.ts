import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  private config: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
    duration: 2000
  }

  openSnackBarSucces(message: string, action: string): void {
    this.config.panelClass = ['success-toast']
    this.snackBar.open(message, action, this.config);
  }

  openSnackBarError(message: string, action: string): void {
    this.config.panelClass = ['error-toast']
    this.snackBar.open(message, action, this.config);
  }
  


}