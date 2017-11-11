import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-my-games',
  templateUrl: `./app.component.html`,
})

export class AppComponent implements OnInit {
  availableUsers: User[];
  selectedUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.selectedUser = this.userService.getCurrentUser();
    this.availableUsers = this.userService.getAvailabletUsers();
  }

  changeUser(): void {
    this.userService.setCurrentUser(this.selectedUser);
  }
}
