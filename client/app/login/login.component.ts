import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { AuthService } from "../services/auth.service";
import { MsgComponent } from "../shared/msg/msg.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  nickname = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  code = new FormControl("", [Validators.minLength(5)]);

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public msg: MsgComponent
  ) {}

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(["/"]);
    }
    this.loginForm = this.formBuilder.group({
      nickname: this.nickname
      // code: this.code
    });
  }

  setClassNickname() {
    return { "has-danger": !this.nickname.pristine && !this.nickname.valid };
  }

  // setClassCode() {
  //   return { "has-danger": !this.code.pristine && !this.code.valid };
  // }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => this.router.navigate(["/"]),
      error => {
        this.msg.setMessage("invalid nickname or code!", "danger");
        console.log(error);
      }
    );
  }
}
