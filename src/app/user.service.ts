import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'app/model/user';

@Injectable()
export class UserService {
    @Output() userChangeEvent: EventEmitter<User> = new EventEmitter();

    antoni: User = { bgglogin: 'cosmicdice', name: 'Antoni' };
    benjamin: User = { bgglogin: 'benofx', name: 'Benjamin' };
    frederic: User = { bgglogin: 'fredericdib', name: 'Frederic' };

    availableUsers: [User] = [this.antoni, this.benjamin, this.frederic];
    currentUser: User;

    constructor() {
        this.currentUser = this.frederic;
    }

    public setCurrentUser(user: User): void {
        this.currentUser = user;
        this.userChangeEvent.emit(this.currentUser);
    }

    public getCurrentUser(): User {
        return this.currentUser;
    }

    public getAvailabletUsers(): User[] {
        return this.availableUsers;
    }
}
