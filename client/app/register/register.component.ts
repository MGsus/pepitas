import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { UserService } from "../services/user.service";
import { MsgComponent } from "../shared/msg/msg.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  nickname = new FormControl("", [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern("[a-zA-Z0-9_-\\s]*")
  ]);
  role = new FormControl("", [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public msg: MsgComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nickname: this.nickname,
      role: this.role
    });
  }

  setClassNickname() {
    return { "has-danger": !this.nickname.pristine && !this.nickname.valid };
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.msg.setMessage("you successfully registered!", "success");
        this.router.navigate(["/login"]);
      },
      error => this.msg.setMessage("nickname already exists", "danger")
    );
  }
}
