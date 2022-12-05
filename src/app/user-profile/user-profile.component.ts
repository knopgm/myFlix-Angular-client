import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

// You'll use this import to close the dialog on success
// import { MatDialogRef } from '@angular/material/dialog';

// // This import is used to display notifications back to the user
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  username = localStorage.getItem('user');
  password = localStorage.getItem('password');
  @Input() userData = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService // public dialogRef: MatDialogRef<UserProfileComponent>, // public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    if (this.username) {
      this.fetchApiData.getUser(this.username).subscribe((result) => {
        console.log(result);

        // this.userData.username = result.username;
      });
    }
  }

  editUser(): void {}

  // This is the function responsible for sending the form inputs to the backend
  // editUser(): void {
  //   this.fetchApiData.updateUser(this.userData).subscribe(
  //     (result) => {
  //       // Logic for a successful user update goes here!
  //       this.dialogRef.close(); // This will close the modal on success!
  //       console.log(result);
  //       this.snackBar.open(result, 'OK', {
  //         duration: 2000,
  //       });
  //     },
  //     (result) => {
  //       console.log(result);
  //       this.snackBar.open(result, 'OK', {
  //         duration: 2000,
  //       });
  //     }
  //   );
  // }
}
