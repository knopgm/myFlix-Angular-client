// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This import is used to route the loged user to the movies page
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful user login goes here!
        this.dialogRef.close(); // This will close the modal on success!
        localStorage.setItem('user', result.user.username);
        localStorage.setItem('token', result.token);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        // This function is called when an error happens during the API call
        this.snackBar.open('Incorrect username or password', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
