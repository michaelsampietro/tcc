import { Component, OnInit } from '@angular/core';
import { UserService } from '../utils/user.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	email: string;
	password: string;

	constructor(private userService: UserService, 
		private loadingController: LoadingController) { }

	ngOnInit() { }
	
	loginGoogle() {
		this.userService.LoginGoogle();	
	}

	loginFacebook() {
		this.userService.LoginFacebook();
	}

	logout() {
		this.userService.Logout();
	}
}
