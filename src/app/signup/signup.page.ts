import { Component, OnInit } from '@angular/core';
import { UserService } from '../utils/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;
  passwordConfirmation: string;
  inputClass: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.email = this.password = this.passwordConfirmation = this.inputClass = "";
  }

  createUser() {
		this.userService.CreateUserUsingEmailAndPassword(this.email, this.password);
  }
  
  verifyIfPasswordMatches() {
    if (this.password != this.passwordConfirmation) {
      this.inputClass = "input-error";
      document.getElementById("submitButton").setAttribute("disabled", "true");
    } else {
      this.inputClass = "input-success";
      document.getElementById("submitButton").setAttribute("disabled", "false");
    }
  }

}
