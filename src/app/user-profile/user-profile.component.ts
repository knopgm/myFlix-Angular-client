import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Close Dialog on sucess
import { FetchApiDataService } from '../fetch-api-data.service'; // API
import { MatSnackBar } from '@angular/material/snack-bar'; // Notifications
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // username = localStorage.getItem('user');
  // password = localStorage.getItem('password');
  @Input() user = {
    username: '',
    password: '',
    email: '',
    birthday: new FormControl(),
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Fetch user data via API
   * @returns object with user information
   * @function getUserInfo
   */
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.user.username = result.username;
      this.user.email = result.email;
      this.user.birthday.setValue(new Date(result.birthday));
    });
  }

  /**
   * Update user data, such as password, email, or birthday
   * @function updateUserInfo
   */

  updateUserInfo(): void {
    console.log(this.user.birthday.value);
    const data = {
      email: this.user.email,
      password: this.user.password,
      birthday: this.user.birthday.value,
    };
    this.fetchApiData.updateUser(data).subscribe((result) => {
      this.snackBar.open('User profile succeccfuly updated', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * Delete user all data
   * @function deleteAccount
   */
  deleteAccount(): void {
    if (
      confirm('All your safed data will be lost - Do you want to continue?')
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
