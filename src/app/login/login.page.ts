import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	email: string;
	password: string;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
	}

	createAccount() {
		this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
	}
	
	login() {
		this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
	}
	
  logout() {
		this.afAuth.auth.signOut();
	}
}
