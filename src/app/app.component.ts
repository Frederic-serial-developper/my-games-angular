import { Component } from '@angular/core';
import { AuthService } from './auth-service';

@Component({
  selector: 'app-my-games',
  templateUrl: `./app.component.html`,
})
export class AppComponent {
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

}
