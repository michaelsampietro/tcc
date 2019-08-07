import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../utils/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public afAuth: AngularFireAuth, private userService: UserService) {
    userService.ControlPageAccess();
  }

}
