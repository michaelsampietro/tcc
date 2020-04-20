import { Component, OnInit } from "@angular/core";
import { UserService } from "../utils/user/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  loginGoogle() {
    this.userService.LoginGoogle();
  }

  loginEmail() {
    this.userService.LoginUsingEmailAndPassword(this.email, this.password);
  }

  logout() {
    this.userService.Logout();
  }
}
